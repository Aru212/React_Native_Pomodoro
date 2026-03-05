import { useState, useEffect } from "react";

export const usePomodoroTimer = () => {
  const focusTime = 25 * 60;
  const breakTime = 5 * 60;

  const [timeLeft, setTimeLeft] = useState(focusTime);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus");

  useEffect(() => {
    let timer;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(focusTime);
    setMode("focus");
  };

  useEffect(() => {
    if (timeLeft === 0) {
      if (mode === "focus") {
        setMode("break");
        setTimeLeft(breakTime);
      } else {
        setMode("focus");
        setTimeLeft(focusTime);
      }
    }
  }, [timeLeft]);

  return { timeLeft, start, pause, reset, mode };
};