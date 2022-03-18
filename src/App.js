import { Paper, Typography, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import SlideDisplay from './SlideDisplay';
import SlideTabs from './SlideTabs';
import { motion, useMotionValue, useTransform } from "framer-motion";
import './App.css';
import useEventfulEffect from './hooks/useEventfulEffect';

const slides = [
  {
    "label": "Creation",
    "title": "How was Eldon Slides made?",
    "content": <Typography>Ms. Gary has asked that I cover the following topics in this presentation...<ul><li>The Software Used</li><li>How It Works</li><li>How To Use it</li></ul></Typography>,
  },
  {
    "label": "Software",
    "title": "What software did I use?",
    "content": <Typography>Eldon Slides' primary stack consists of the following...<ul><li>React and JavaScript for creating the website</li><li>GalaxyGate and Porkbun for hosting</li><li>GitHub for hosting the SourceCode</li><li>Framer-Motion and MUI for design</li></ul></Typography>,
  },
  {
    "label": "How",
    "title": "How does Eldon Slides work?",
    "content": <Typography><ul><li>Slide information is hard-coded<ul><li>You have to code to make a slide</li></ul></li><li>Eldon Slides is not meant for everyone to use</li><li>However, The code is open-sourced</li></ul></Typography>,
  },
  {
    "label": "Using it",
    "title": "How do I create a Eldon Slide?",
    "content": <Typography>It may sound easy, but it is not.<ul><li>Fork the GitHub</li><li>Open in VSCode</li><li>Edit the slides variable in App.js</li><li>Build app and host</li></ul></Typography>,
  },
  {
    "label": "Favorite Thing",
    "title": "Okay, so what is my favorite thing?",
    "content": <Typography>My favorite thing is TypeScript!<ul><li>TypeScript makes coding faster</li><li>TypeScript is very enjoyable to use</li><li>However, you do run into type errors a lot</li></ul></Typography>,
  },
  {
    "label": "TypeScript?",
    "title": "What is TypeScript?",
    "content": <Typography>TypeScript is like JavaScript, however...<ul><li>TypeScript has specified types</li><li>Code autocomplete is much better</li><li>Makes JSDoc redundant</li></ul></Typography>
  }
]

const MotionButton = motion(Button);
const BottomCallout = ({ biggify, }) => {
  const [currentBiggify, setBiggify] = biggify;
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, -10, -80], [0, 0, 1]);

  return (<Typography sx={{ 'position': 'absolute', 'bottom': '10px', 'display': 'flex', 'alignItems': 'center', 'flexDirection': 'column', }}>
    <MotionButton variant="contained" onClick={() => setBiggify(!currentBiggify)} style={{ opacity: opacity, scale: opacity, }} sx={{ width: 'min-content', }}>Biggify</MotionButton>
    <motion.div drag="y" style={{ y, }} dragConstraints={{ 'bottom': 0, 'top': -80, }} dragElastic={0}>Wanna see how this was <a href="https://github.com/eldonwilliams/what-is-a-computer">made</a>?</motion.div>
  </Typography>);
}

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const biggify = useState(false);

  const setSlide = (event, newValue) => setCurrentSlide(newValue);

  useEventfulEffect((connectEvent) => {
    connectEvent(window, 'keydown', (event) => {
      if (event.code === "ArrowLeft" && currentSlide - 1 >= 0) setCurrentSlide(currentSlide - 1);
      if (event.code === "ArrowRight" && currentSlide + 1 < slides.length) setCurrentSlide(currentSlide + 1); 
    });
  }, [currentSlide]);

  return (<div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10vh',
  }}>
    <Paper elevation={1} sx={{ 'maxWidth': '90vw', }}>
      <SlideTabs slides={slides} slide={currentSlide} setSlide={setSlide} />
    </Paper>
    
    <SlideDisplay biggify={biggify} currentSlide={currentSlide} slides={slides} setSlide={setCurrentSlide} />
    <BottomCallout biggify={biggify} />
  </div>)
};

export default App;
