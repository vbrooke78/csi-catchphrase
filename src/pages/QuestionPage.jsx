import React from 'react';
import { useNavigate } from 'react-router-dom';
import questions from '../data/questions';
import '../styles/questionPage.css';

export const QuestionPage = ({ questionIndex, setQuestionIndex }) => {
  const navigate = useNavigate();

  const handleIncorrect = () => {
    setQuestionIndex(questionIndex + 1);
  };

  const handleCorrect = () => {
    setQuestionIndex(questionIndex + 1);
    navigate('/catchphrase');
  };

  return (
    <section className="question-page">
      <section className="question-container">
        <h2>{questions[questionIndex]}</h2>
      </section>
      <section className="button-container">
        <button className="button incorrect" onClick={handleIncorrect}>
          Incorrect - go to next question
        </button>
        <button className="button correct" onClick={handleCorrect}>
          Correct - go to catchphrase
        </button>
      </section>
    </section>
  );
};
