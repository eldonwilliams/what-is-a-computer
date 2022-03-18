import { Box, Tab, Tabs } from "@mui/material";

const SlideTabs = ({ slides, slide, setSlide, }) => {
  return (<Box sx={{ width: '100%', }}>
    <Tabs value={slide} onChange={setSlide} variant="scrollable" scrollButtons="auto">
      {slides.map((value, index) => (<Tab key={index} label={value.label} />))}
    </Tabs>
  </Box>);
};

export default SlideTabs;