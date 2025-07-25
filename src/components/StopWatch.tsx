import { useState, useRef, useEffect } from "react";

const STORAGE_KEY = "stopwatch";

type StopwatchState = {
  isRunning: boolean;
  startTime: number | null;
  pausedTime: number;
};

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 👈 THÊM LOADING
  const intervalRef = useRef<number | null>(null);
  const stateRef = useRef<StopwatchState>({
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

  // Load trạng thái từ localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed: StopwatchState = JSON.parse(saved);
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
    setIsLoading(false); // 👈 ĐÃ LOAD XONG
  }, []);

  useEffect(() => {
    const state = stateRef.current;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [isRunning, seconds]);

  const handleStart = () => {
    if (isRunning) return;
    const now = Date.now();
    stateRef.current.startTime = now;
    stateRef.current.isRunning = true;
    setIsRunning(true);
    startInterval();
  };

  const handleStop = () => {
    if (!isRunning) return;
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
  };

  const handleReset = () => {
    stopInterval();
    stateRef.current = {
      isRunning: false,
      startTime: null,
      pausedTime: 0,
    };
    setSeconds(0);
    setIsRunning(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  useEffect(() => {
    return () => stopInterval();
  }, []);

  // 👇 RENDER LOADING NẾU ĐANG LOAD
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40 w-80">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-80 text-center space-y-4">
      <h1 className="text-2xl font-semibold">⏱ Stopwatch</h1>
      <div className="text-4xl font-mono">{seconds}s</div>
      <div className="flex justify-center gap-2">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50  cursor-pointer"
        >
          Start
        </button>
        <button
          onClick={handleStop}
          disabled={!isRunning}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 cursor-pointer"
        >
          Stop
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
