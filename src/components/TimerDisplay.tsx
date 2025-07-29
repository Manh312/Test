interface TimerDisplayProps {
  seconds: number;
}

const TimerDisplay = ({ seconds }: TimerDisplayProps) => {
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  return <div className="text-4xl font-mono">{formatTime(seconds)}</div>;
};

export default TimerDisplay;