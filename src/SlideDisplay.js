import { Button, ButtonGroup, Paper, Typography } from "@mui/material";
import { Motion, spring } from "react-motion";

const Slide = ({ slides, currentSlide, handleNext, handlePrevious, slide, index }) => {

    return (<Motion defaultStyle={{'opacity': 0}} style={{ 'opacity': spring(currentSlide === index ? 1 : 0, { 'stiffness': 250, 'damping': 22.5, }), }}>
        {(style) => (<Paper sx={{ 'position': 'absolute', 'top': '15%', 'width': 'content', 'maxWidth': '300px', 'height': 'content', 'padding': '10px', 'opacity': style.opacity, 'transform': `scale(${style.opacity})`, }} elevation={5}>
            <Typography variant="h5"><b>{slide.label}</b></Typography><br/>
            <Typography>{slide.content}</Typography><br/>
            <ButtonGroup>
                <Button onClick={handlePrevious} disabled={(slides.length - 1 === currentSlide && currentSlide === 0) || currentSlide === 0}>Previous</Button>
                <Button onClick={handleNext} variant="contained" disabled={slides.length - 1 === currentSlide}>Next</Button>
            </ButtonGroup>
        </Paper>)}
    </Motion>)
}

const SlideDisplay = ({ slides, currentSlide, setSlide, }) => {
    const handleNext = () => {
        setSlide(currentSlide + 1);
    };

    const handlePrevious = () => {
        setSlide(currentSlide - 1);
    };

    return (<>
        {slides.map((slide, index) => (<Slide index={index} key={index} slides={slides} currentSlide={currentSlide} handleNext={handleNext} handlePrevious={handlePrevious} slide={slide} />))}
    </>)
};

export default SlideDisplay;