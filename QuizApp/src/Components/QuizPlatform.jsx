import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { quizData } from './data/quizData';
import QuestionCard from './QuestionCard';
import ScoreBoard from './ScoreBoard';
import StartPage from './StartPage';
import TimerComponent from './Timer';
import { calculateScore } from './utils/scoring';
import { saveAttempt } from './utils/storage';

const QuizPlatform = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [userName, setUserName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [attempts, setAttempts] = useState([]);
  const [integerAnswer, setIntegerAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);

  const handleStartQuiz = (name) => {
    setUserName(name);
    setQuizStarted(true);
  };

  useEffect(() => {
    if (!quizComplete && timeRemaining > 0 && quizStarted) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleNextQuestion();
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeRemaining, quizComplete, quizStarted]);

  const handleMultipleChoiceAnswer = (optionIndex) => {
    const correct = optionIndex === quizData[currentQuestionIndex].correctAnswer;
    setFeedback({ correct, message: correct ? "Correct!" : "Incorrect" });
    setUserAnswers([...userAnswers, optionIndex]);
    setTimeout(handleNextQuestion, 1000);
  };

  const handleIntegerAnswer = () => {
    const correct = parseInt(integerAnswer) === quizData[currentQuestionIndex].correctAnswer;
    setFeedback({ correct, message: correct ? "Correct!" : "Incorrect" });
    setUserAnswers([...userAnswers, parseInt(integerAnswer)]);
    setIntegerAnswer('');
    setTimeout(handleNextQuestion, 1000);
  };

  const handleNextQuestion = () => {
    setFeedback(null);
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeRemaining(30);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    setQuizComplete(true);
    const score = calculateScore(userAnswers, quizData);
    const newAttempt = { 
      date: new Date(), 
      userName,
      score,
      totalQuestions: quizData.length 
    };
    setAttempts([...attempts, newAttempt]);
    saveAttempt(newAttempt);
  };

  const startNewAttempt = () => {
    setCurrentQuestionIndex(0);
    setTimeRemaining(30);
    setUserAnswers([]);
    setQuizComplete(false);
    setFeedback(null);
    setIntegerAnswer('');
  };

  if (!quizStarted) {
    return <StartPage onStart={handleStartQuiz} />;
  }

  if (quizComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              Quiz Complete, {userName}!
            </h2>
            <p className="text-gray-600">Here's how you did:</p>
          </div>
          <ScoreBoard
            score={calculateScore(userAnswers, quizData)}
            totalQuestions={quizData.length}
            attempts={attempts}
            startNewAttempt={startNewAttempt}
          />
        </motion.div>
      </div>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        {/* Animated Title */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600"
        >
          Quiz Game
        </motion.h1>

        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Question {currentQuestionIndex + 1} of {quizData.length}</h2>
            <TimerComponent timeRemaining={timeRemaining} />
          </div>
        </div>

        {/* Animated Question Card */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <QuestionCard
            question={currentQuestion.question}
            type={currentQuestion.type}
            options={currentQuestion.options}
            handleMultipleChoiceAnswer={handleMultipleChoiceAnswer}
            handleIntegerAnswer={handleIntegerAnswer}
            integerAnswer={integerAnswer}
            setIntegerAnswer={setIntegerAnswer}
          />
        </motion.div>

        {/* Animated Feedback */}
        {feedback && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`text-center p-2 rounded ${feedback.correct ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
          >
            {feedback.correct ? (
              <CheckCircle className="w-6 h-6 mx-auto mb-1" />
            ) : (
              <XCircle className="w-6 h-6 mx-auto mb-1" />
            )}
            {feedback.message}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuizPlatform;