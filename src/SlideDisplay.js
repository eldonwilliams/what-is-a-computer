import { Button, ButtonGroup, Paper, Typography } from "@mui/material";

const SlideDisplay = ({ slides, currentSlide, setSlide, }) => {
    const handleNext = () => {
        setSlide(currentSlide + 1);
    };

    const handlePrevious = () => {
        setSlide(currentSlide - 1);
    };

    return (<Paper sx={{ 'width': 'content', 'maxWidth': '50%', 'height': 'content', 'padding': '10px', }} elevation={5}>
        <Typography variant="h5"><b>{slides[currentSlide].label}</b></Typography><br/>
        <Typography>{slides[currentSlide].content}</Typography><br/>
        <ButtonGroup>
            <Button onClick={handlePrevious} disabled={(slides.length - 1 === currentSlide && currentSlide === 0) || currentSlide === 0}>Previous</Button>
            <Button onClick={handleNext} variant="contained" disabled={slides.length - 1 === currentSlide}>Next</Button>
        </ButtonGroup>
    </Paper>)
};

export default SlideDisplay;