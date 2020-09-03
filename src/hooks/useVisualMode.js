import { useState } from 'react';

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {

    if (replace) {
      setHistory([...history]);
    } else {
      setHistory([mode, ...history]);
    }

    setMode(newMode);

  }

  const back = () => {

    if (history.length === 0) {
      return;
    }

    const [newMode, ...prevModes] = history;
    setHistory(prevModes);
    setMode(newMode);
  
  }
  return { mode, transition, back };
}