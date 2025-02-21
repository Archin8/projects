import Button from './Button';
import Input from './Input';

const QuestionCard = ({
  question,
  type,
  options,
  handleMultipleChoiceAnswer,
  handleIntegerAnswer,
  integerAnswer,
  setIntegerAnswer,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-lg">{question}</div>

      {type === 'multiple-choice' ? (
        <div className="grid gap-2">
          {options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleMultipleChoiceAnswer(index)}
              variant="outline"
              className="w-full text-left justify-start h-auto py-4"
            >
              {String.fromCharCode(65 + index)}. {option}
            </Button>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          <Input
            type="number"
            value={integerAnswer}
            onChange={(e) => setIntegerAnswer(e.target.value)}
            placeholder="Enter your answer"
            className="text-center"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && integerAnswer) {
                handleIntegerAnswer();
              }
            }}
          />
          <Button 
            onClick={handleIntegerAnswer}
            className="w-full"
            disabled={!integerAnswer}
          >
            Submit Answer
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;