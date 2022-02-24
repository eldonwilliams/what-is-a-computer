import { Button, ButtonGroup, Paper, Stack, Typography } from "@mui/material";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useEffect, useState } from "react";

/**
 * @type {import("framer-motion").Transition}
 */
const transition = {
    type: 'spring',
    duration: 0.25,
}

const iconVariants = {
    "active": {
        opacity: 1, scale: 1,
        transition,
    },
    "inactive": {
        opacity: 0, scale: 0,
        transition,
    },
}

const Slide = ({ slides, currentSlide, handleNext, handlePrevious, slide, index }) => {
    const x = useMotionValue(0);
    const height = useTransform(x, [-65, -50, 0, 50, 65], [-15, 0, 0, 0, -15]);
    const [signalState, setSignalState] = useState(0); // 0 - prompt | 1 - checkmark | 2 - no

    const dragEnd = () => {
        if (x.get() > 50 && index + 1 < slides.length) handleNext();
        if (x.get() < -50 && index - 1 >= 0) handlePrevious();
    }

    useEffect(() => x.onChange(() => {
        // This is condensed into a single line of ? operator logic just to make it shorter, but it *should* work
        if (x.get() > 0 && index + 1 >= slides.length) { setSignalState(0); return; }
        if (x.get() < 0 && index - 1 < 0) { setSignalState(0); return; }
        setSignalState(x.get() === 0 ? 0 : (x.get() > 50 || x.get() < -50 ? 1 : 2));
    }), []);

    return (<AnimatePresence>
        {currentSlide === index && <motion.div
            initial={{ opacity: 0, scale: 0.75, }}
            animate={{ opacity: 1, scale: 1, }}
            exit={{ opacity: 0, scale: 0.75, }}
            drag="x"
            dragConstraints={{ 'left': 0, 'right': 0, 'top': 0, 'bottom': 0, }}
            style={{
                x,
                'position': 'absolute',
                'top': '25%', 'width': 'content',
                'maxWidth': '300px', 'height': 'content',
                'y': height,
            }}
            onDragEnd={dragEnd}
        >
            <Paper
                elevation={5}
                sx={{ 'padding': '10px', }}
            >
                <Typography variant="h5"><b>{slide.label}</b></Typography><br/>
                <Typography>{slide.content}</Typography><br/>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <ButtonGroup>
                        <Button onClick={handlePrevious} disabled={(slides.length - 1 === currentSlide && currentSlide === 0) || currentSlide === 0}>Previous</Button>
                        <Button onClick={handleNext} variant="contained" disabled={slides.length - 1 === currentSlide}>Next</Button>
                    </ButtonGroup>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                            height: '100%',
                        }}
                    >
                        <AnimatePresence>
                            {signalState === 2 && <motion.div
                                variants={iconVariants}
                                initial="inactive"
                                animate="active"
                                exit="inactive"
                                style={{ position: 'absolute', }}
                            >
                                <CloseIcon color="error" />
                            </motion.div>}
                        </AnimatePresence>
                        <AnimatePresence>
                            {signalState === 1 && <motion.div
                                variants={iconVariants}
                                initial="inactive"
                                animate="active"
                                exit="inactive"
                                style={{ position: 'absolute', }}
                            >
                                <CheckIcon color="success" />
                            </motion.div>}
                        </AnimatePresence>
                        <AnimatePresence>
                            {signalState === 0 && <motion.div
                                variants={iconVariants}
                                initial="inactive"
                                animate="active"
                                exit="inactive"
                                style={{ position: 'absolute', }}
                            >
                                <DragIndicatorIcon />
                            </motion.div>}
                        </AnimatePresence>
                    </div>
                </Stack>
            </Paper>
        </motion.div>}
    </AnimatePresence>);
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