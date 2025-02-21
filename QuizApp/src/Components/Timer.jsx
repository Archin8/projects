import { Timer } from 'lucide-react';

const TimerComponent = ({ timeRemaining }) => {
  return (
    <div className="flex items-center text-orange-500 font-semibold">
      <Timer className="w-4 h-4 mr-2" />
      {timeRemaining}s
    </div>
  );
};

export default TimerComponent;