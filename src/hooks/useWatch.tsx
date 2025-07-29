import { useState, useRef, useEffect } from "react";
import type { WatchState } from "../types/watch";

const STORAGE_KEY = "stopwatch";

export const useWatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isButtonLoading, setIsButtonLoading] = useState({ start: false, stop: false, reset: false });
  const intervalRef = useRef<number | null>(null);
  const stateRef = useRef<WatchState>({
    isRunning: false,
    startTime: null,
    pausedTime: 0,
  });

  const startInterval = () => {
    if (intervalRef.current !== null) return;
    intervalRef.current = window.setInterval(() => {
      const now = Date.now();
      const { startTime, pausedTime } = stateRef.current;
      if (startTime !== null) {
        const elapsed = Math.floor((now - startTime) / 1000) + pausedTime;
        setSeconds(elapsed);
      }
    }, 1000);
  };

  const stopInterval = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed: WatchState = JSON.parse(saved);
      stateRef.current = parsed;

      if (parsed.isRunning && parsed.startTime !== null) {
        const now = Date.now();
        const elapsed = Math.floor((now - parsed.startTime) / 1000) + parsed.pausedTime;
        setSeconds(elapsed);
        setIsRunning(true);
        startInterval();
      } else {
        setSeconds(parsed.pausedTime);
        setIsRunning(false);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const state = stateRef.current;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [isRunning, seconds]);

  const handleStart = () => {
    if (isRunning || isButtonLoading.start) return;
    setIsButtonLoading((prev) => ({ ...prev, start: true }));
    setTimeout(() => {
      const now = Date.now();
      stateRef.current.startTime = now;
      stateRef.current.isRunning = true;
      setIsRunning(true);
      startInterval();
      setIsButtonLoading((prev) => ({ ...prev, start: false }));
    }, 1000); // Giả lập loading trong 1 giây
  };

  const handleStop = () => {
    if (!isRunning || isButtonLoading.stop) return;
    setIsButtonLoading((prev) => ({ ...prev, stop: true }));
    setTimeout(() => {
      const now = Date.now();
      const { startTime, pausedTime } = stateRef.current;
      if (startTime !== null) {
        const elapsed = Math.floor((now - startTime) / 1000);
        stateRef.current.pausedTime = pausedTime + elapsed;
      }
      stateRef.current.startTime = null;
      stateRef.current.isRunning = false;
      setIsRunning(false);
      stopInterval();
      setIsButtonLoading((prev) => ({ ...prev, stop: false }));
    }, 1000); // Giả lập loading trong 1 giây
  };

  const handleReset = () => {
    if (isButtonLoading.reset) return;
    setIsButtonLoading((prev) => ({ ...prev, reset: true }));
    setTimeout(() => {
      stopInterval();
      stateRef.current = {
        isRunning: false,
        startTime: null,
        pausedTime: 0,
      };
      setSeconds(0);
      setIsRunning(false);
      localStorage.removeItem(STORAGE_KEY);
      setIsButtonLoading((prev) => ({ ...prev, reset: false }));
    }, 1000); // Giả lập loading trong 1 giây
  };

  useEffect(() => {
    return () => stopInterval();
  }, []);

  return {
    seconds,
    isRunning,
    isLoading,
    isButtonLoading,
    handleStart,
    handleStop,
    handleReset,
  };
};