import { Paper, Typography } from '@mui/material';
import { useState } from 'react';
import SlideDisplay from './SlideDisplay';
import SlideTabs from './SlideTabs';
import './App.css';

const slides = [
  {
    "label": "Creation",
    "title": "How was Eldon Slides made?",
    "content": "Ms. Gary has requested I talk about how Eldon Slides was created, the software used to create it, and how it works in layman's terms. The following slides will cover that.",
  },
  {
    "label": "Software",
    "title": "What was Eldon Slides made with?",
    "content": "Ms. Gary has requested I talk about how Eldon Slides was created, the software used to create it, and how it works in layman's terms. The following slides will cover that.",
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
