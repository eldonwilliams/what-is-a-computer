import { Button, ButtonGroup, Modal, Paper, Slider, Stack, Typography } from "@mui/material";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import CheckIcon from '@mui/icons-material/Check';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BlockIcon from '@mui/icons-material/Block';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import React, { createElement, useEffect, useState } from "react";

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
        right: "1%",
        transition,
    },
    "inactive": {
        opacity: 0, scale: 0,
        right: "1%",
        transition,
    },
}

const Slide = ({ slides, currentSlide, handleNext, handlePrevious, slide, index }) => {
    const x = useMotionValue(0);
    const height = useTransform(x, [-65, -50, 0, 50, 65], [-15, 0, 0, 0, -15]);
    const [signalState, setSignalState] = useState(0); // 0 - prompt | 1 - checkmark | 2 - no | 3 - tiny
    const [arrowRotation, setArrowRotation] = useState(0);

    const dragEnd = () => {
        if (x.get() > 50 && index + 1 < slides.length) handleNext();
        if (x.get() < -50 && index - 1 >= 0) handlePrevious();
    }

    useEffect(() => x.onChange(() => {
        // This is condensed into a single line of ? operator logic just to make it shorter, but it *should* work
        setArrowRotation(Math.abs(x.get()) !== x.get() ? 180 : 0)
        if (x.get() > 0 && index + 1 >= slides.length) { setSignalState(3); return; }
        if (x.get() < 0 && index - 1 < 0) { setSignalState(3); return; }
        setSignalState(x.get() === 0 ? 0 : (x.get() > 50 || x.get() < -50 ? 1 : 2));
    }), []);

    return (<AnimatePresence>
        {currentSlide === index && <motion.div
            initial={{ opacity: 0, scale: 0.75, filter: 'blur(4px)', zIndex: -1, }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', zIndex: 1, }}
            exit={{ opacity: 0, scale: 0.75, filter: 'blur(4px)', zIndex: -1, }}
            drag="x"
            dragConstraints={{ 'left': 0, 'right': 0, 'top': 0, 'bottom': 0, }}
            style={{
                x,
                'position': 'absolute',
                'top': '25%', 'width': 'content',
                'maxWidth': '750px', 'height': 'content',
                'y': height,
                'pointerEvents': 'all',
            }}
            onDragEnd={dragEnd}
        >
            <Paper
                elevation={5}
                sx={{ 'padding': '10px', }}
            >
                <Typography variant="h5"><b>{slide.title ? slide.title : slide.label}</b></Typography><br/>
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
                                <ArrowForwardIcon sx={{ 'transform': `rotate(${arrowRotation}deg)`, }} />
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
                        <AnimatePresence>
                            {signalState === 3 && <motion.div
                                variants={iconVariants}
                                initial="inactive"
                                animate="active"
                                exit="inactive"
                                style={{ position: 'absolute', }}
                            >
                                <BlockIcon color="error" />
                            </motion.div>}
                        </AnimatePresence>
                    </div>
                </Stack>
            </Paper>
        </motion.div>}
    </AnimatePresence>);
}

const Slides = ({ slides, currentSlide, handleNext, handlePrevious, }) => slides.map((slide, index) => (<Slide index={index} key={index} slides={slides} currentSlide={currentSlide} handleNext={handleNext} handlePrevious={handlePrevious} slide={slide} />))

const MotionModal = motion(Modal);
const SlideDisplay = ({ slides, currentSlide, setSlide, biggify }) => {
    const handleNext = () => {
        setSlide(currentSlide + 1);
    };

    const handlePrevious = () => {
        setSlide(currentSlide - 1);
    };

    const [currentBiggify, setBiggify] = biggify;
    const [biggifyAmount, setBiggifyAmount] = useState(1.65);

    return (<>
        <AnimatePresence exitBeforeEnter initial={true}>
            {currentBiggify && <MotionModal
                open={true}
                onClose={() => setBiggify(false)}
                initial={{ opacity: 0, }}
                animate={{ opacity: 1, }}
                exit={{opacity: 0, transition: { duration: 0.25, }}}
            >
                <motion.div
                    style={{
                        "width": "100%",
                        "height": "100%",
                        "display": "flex",
                        "justifyContent": "center",
                        "pointerEvents": "none"
                    }}
                >
                    <motion.div
                        initial={{ scale: 1, }}
                        whileInView={{ opacity: 1, transition: { delay: 0.6, }}}
                        animate={{ scale: biggifyAmount, }}
                        exit={{ scale: 1, }}
                        style={{
                            "width": "100%",
                            "height": "100%",
                            "display": "flex",
                            "justifyContent": "center",
                            "pointerEvents": "none"
                        }}
                    >
                        <Slides slides={slides} currentSlide={currentSlide} handleNext={handleNext} handlePrevious={handlePrevious}/>
                    </motion.div>
                    <Slider sx={{ 'pointerEvents': 'all', 'position': 'absolute', 'bottom': '5%', 'width': "50%", }} value={biggifyAmount} step={0.01} min={1} max={2} onChange={(e, newValue) => setBiggifyAmount(newValue)} valueLabelDisplay="auto" />
                </motion.div>
            </MotionModal>}
        </AnimatePresence>
        {!currentBiggify && <Slides slides={slides} currentSlide={currentSlide} handleNext={handleNext} handlePrevious={handlePrevious} />}
    </>)
};

export default SlideDisplay;