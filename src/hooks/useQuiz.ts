import { useState, useCallback, useEffect } from 'react';
import { QuizQuestion } from '@/data/quizQuestions';
import { QuizResult } from '@/data/quizData';
import { getQuizQuestions, calculateScore, saveQuizResult, completeDailyChallenge } from '@/services/quizService';

interface QuizState {
  questions: QuizQuestion[];
  currentIndex: number;
  selectedAnswer: number | null;
  isAnswered: boolean;
  answers: {
    questionId: string;
    selectedAnswer: number;
    isCorrect: boolean;
    timeSpent: number;
  }[];
  score: number;
  isComplete: boolean;
  startTime: number;
  questionStartTime: number;
}

export const useQuiz = (categoryId: string, questionCount: number = 10, isDailyChallenge: boolean = false) => {
  const [state, setState] = useState<QuizState>({
    questions: [],
    currentIndex: 0,
    selectedAnswer: null,
    isAnswered: false,
    answers: [],
    score: 0,
    isComplete: false,
    startTime: Date.now(),
    questionStartTime: Date.now()
  });

  // Inicializar quiz
  useEffect(() => {
    const questions = getQuizQuestions(categoryId, questionCount);
    setState({
      questions,
      currentIndex: 0,
      selectedAnswer: null,
      isAnswered: false,
      answers: [],
      score: 0,
      isComplete: false,
      startTime: Date.now(),
      questionStartTime: Date.now()
    });
  }, [categoryId, questionCount]);

  // Seleccionar respuesta
  const selectAnswer = useCallback((answerIndex: number) => {
    if (state.isAnswered) return;
    setState(prev => ({ ...prev, selectedAnswer: answerIndex }));
  }, [state.isAnswered]);

  // Confirmar respuesta
  const confirmAnswer = useCallback(() => {
    if (state.selectedAnswer === null || state.isAnswered) return;

    const currentQuestion = state.questions[state.currentIndex];
    const isCorrect = state.selectedAnswer === currentQuestion.correctAnswer;
    const timeSpent = (Date.now() - state.questionStartTime) / 1000;

    const newAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer: state.selectedAnswer,
      isCorrect,
      timeSpent
    };

    setState(prev => ({
      ...prev,
      isAnswered: true,
      answers: [...prev.answers, newAnswer]
    }));
  }, [state.selectedAnswer, state.isAnswered, state.questions, state.currentIndex, state.questionStartTime]);

  // Siguiente pregunta
  const nextQuestion = useCallback(() => {
    if (state.currentIndex >= state.questions.length - 1) {
      // Quiz completado
      const totalCorrect = state.answers.filter(a => a.isCorrect).length + 
        (state.questions[state.currentIndex]?.correctAnswer === state.selectedAnswer ? 1 : 0);
      
      const finalAnswers = [...state.answers];
      if (state.isAnswered && state.answers.length === state.currentIndex) {
        const currentQuestion = state.questions[state.currentIndex];
        finalAnswers.push({
          questionId: currentQuestion.id,
          selectedAnswer: state.selectedAnswer!,
          isCorrect: state.selectedAnswer === currentQuestion.correctAnswer,
          timeSpent: (Date.now() - state.questionStartTime) / 1000
        });
      }

      const score = calculateScore(
        finalAnswers.filter(a => a.isCorrect).length,
        state.questions.length,
        finalAnswers
      );

      const result: QuizResult = {
        id: `quiz-${Date.now()}`,
        categoryId,
        score,
        totalQuestions: state.questions.length,
        correctAnswers: finalAnswers.filter(a => a.isCorrect).length,
        timeSpent: (Date.now() - state.startTime) / 1000,
        completedAt: Date.now(),
        answers: finalAnswers
      };

      saveQuizResult(result);
      
      if (isDailyChallenge) {
        completeDailyChallenge(score);
      }

      setState(prev => ({
        ...prev,
        isComplete: true,
        score,
        answers: finalAnswers
      }));
    } else {
      setState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        selectedAnswer: null,
        isAnswered: false,
        questionStartTime: Date.now()
      }));
    }
  }, [state, categoryId, isDailyChallenge]);

  // Reiniciar quiz
  const resetQuiz = useCallback(() => {
    const questions = getQuizQuestions(categoryId, questionCount);
    setState({
      questions,
      currentIndex: 0,
      selectedAnswer: null,
      isAnswered: false,
      answers: [],
      score: 0,
      isComplete: false,
      startTime: Date.now(),
      questionStartTime: Date.now()
    });
  }, [categoryId, questionCount]);

  const currentQuestion = state.questions[state.currentIndex];
  const progress = state.questions.length > 0 
    ? ((state.currentIndex + 1) / state.questions.length) * 100 
    : 0;

  const correctAnswers = state.answers.filter(a => a.isCorrect).length;

  return {
    // Estado
    questions: state.questions,
    currentQuestion,
    currentIndex: state.currentIndex,
    totalQuestions: state.questions.length,
    selectedAnswer: state.selectedAnswer,
    isAnswered: state.isAnswered,
    isComplete: state.isComplete,
    score: state.score,
    correctAnswers,
    progress,
    answers: state.answers,
    timeElapsed: (Date.now() - state.startTime) / 1000,
    
    // Acciones
    selectAnswer,
    confirmAnswer,
    nextQuestion,
    resetQuiz
  };
};
