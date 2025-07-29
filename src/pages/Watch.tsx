
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";
import TimerDisplay from "../components/TimerDisplay";
import { useWatch } from "../hooks/useWatch";

const Watch = () => {
  const { seconds, isRunning, isLoading, isButtonLoading, handleStart, handleStop, handleReset } = useWatch();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-80 text-center space-y-4">
      <BackButton />
      <h1 className="text-2xl font-semibold mt-10">Stopwatch</h1>
      <TimerDisplay seconds={seconds} />
      <div className="flex justify-center gap-2">
        <Button
          onClick={handleStart}
          disabled={isRunning}
          isLoading={isButtonLoading.start}
          className="bg-green-500 hover:bg-green-600"
        >
          Start
        </Button>
        <Button
          onClick={handleStop}
          disabled={!isRunning}
          isLoading={isButtonLoading.stop}
          className="bg-red-500 hover:bg-red-600"
        >
          Stop
        </Button>
        <Button
          onClick={handleReset}
          isLoading={isButtonLoading.reset}
          className="bg-gray-500 hover:bg-gray-600"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Watch;