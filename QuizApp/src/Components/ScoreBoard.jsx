import Button from './Button';

const ScoreBoard = ({ score, totalQuestions, attempts, startNewAttempt }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
          Score: {score} / {totalQuestions}
        </div>
        <div className="text-lg text-gray-600">
          ({((score / totalQuestions) * 100).toFixed(1)}%)
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Previous Attempts:</h3>
        {attempts.map((attempt, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600">{attempt.userName} - {attempt.date.toLocaleString()}</span>
            <span className="font-medium">
              {attempt.score}/{attempt.totalQuestions} 
              ({((attempt.score / attempt.totalQuestions) * 100).toFixed(1)}%)
            </span>
          </div>
        ))}
      </div>
      
      <Button
        onClick={startNewAttempt}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
      >
        Try Again
      </Button>
    </div>
  );
};

export default ScoreBoard;