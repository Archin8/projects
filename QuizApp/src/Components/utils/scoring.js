export const calculateScore = (userAnswers, quizData) => {
    return userAnswers.reduce((score, answer, index) => {
      return score + (answer === quizData[index].correctAnswer ? 1 : 0);
    }, 0);
  };