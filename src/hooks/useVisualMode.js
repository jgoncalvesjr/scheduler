import { useState } from 'react';

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    setMode(mode);

    if (replace) {
      const updateHistory = [...history];
      updateHistory.pop()
      updateHistory.push(mode);
      setHistory(updateHistory);

    } else {

      setHistory([...history, mode]);
    }

  }

  const back = () => {

    if (history.length > 1) {
      const updateHistory = [...history];
      updateHistory.pop()
      setHistory(updateHistory);
      setMode(updateHistory[updateHistory.length - 1]);
    }
  
  }
  return { mode, transition, back };
}