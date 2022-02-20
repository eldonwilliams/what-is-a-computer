import { Paper, Typography } from '@mui/material';
import { useState } from 'react';
import SlideDisplay from './SlideDisplay';
import SlideTabs from './SlideTabs';
import './App.css';

const slides = [
  {
    "label": "CPU",
    "content": "The CPU is the \"Brain\" of the computer. The CPU is really good at doing math, fast.",
  },
  {
    "label": "RAM",
    "content": "The RAM, or Random Access Memory, is the part of the computer which remembers things short-term.",
  },
  {
    "label": "Hard Drive",
    "content": "The Hard Drive is used to save picture, games, and other big files. The Hard Drive has a lot more space than the RAM which is why you want to use it for bigger files.",
  },
  {
    "label": "Motherboard",
    "content": "The Motherboard connects all the other parts of the computer. It holds the CPU, RAM, GPU, and most major components.",
  },
  {
    "label": "GPU",
    "content": "The GPU is useful for rendering video games. It can handle the math that each pixel needs for realistic games. GPUs are also useful for rendering videos when editing.",
  },
  {
    "label": "Case",
    "content": "The Case of a computer is like your skin. It holds all the components together and allows you to transport them without breaking them.",
  },
  {
    "label": "Power Supply",
    "content": "The Power Supply of a computer is like your stomach. It provides energy to all components which need it. They're often very inexpensive and not that complex, but they're important!",
  },
  {
    "label": "Uses",
    "content": "The four major uses of a computer are taking inputs, storing data, processing data, and generating outputs. The way computers do this can vary a lot, but they all do those 4 functions in some way.",
  },
]

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const setSlide = (event, newValue) => setCurrentSlide(newValue);

  return (<div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10vh',
  }}>
    <Paper elevation={1} sx={{ 'maxWidth': '90vw', }}>
      <SlideTabs slides={slides} slide={currentSlide} setSlide={setSlide} />
    </Paper>
    
    <SlideDisplay currentSlide={currentSlide} slides={slides} setSlide={setCurrentSlide} />
    <Typography sx={{ 'position': 'absolute', 'bottom': '10px', }}>Wanna see how this was <a href="https://github.com/eldonwilliams/what-is-a-computer">made</a>?</Typography>
  </div>)
};

export default App;
