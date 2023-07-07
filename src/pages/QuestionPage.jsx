import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../layout/Header';

export const QuestionPage = ({ questionIndex, setQuestionIndex }) => {
  const navigate = useNavigate();

  const questions = [
    'What is Locard’s Theory?',
    'Name three factors which might affect the exchange of material in Locard’s theory.',
    'Where might you find ridge detail on the body?',
    'When do an individual’s fingerprints/ridge details start to form?',
    'What is the difference between a visible and latent mark?',
    'Look at the images on the screen, identify the correct pattern in each.',
    'What is a Galton detail?',
    'Name two characteristics/features in a fingerprint.',
    'Name the two sweat glands mentioned in the presentation.',
    'Where is the sebaceous gland found?',
    'Name two constituents of sweat from the sebaceous gland',
    'Where are the eccrine sweat glands most commonly found?',
    'Name a constituent of sweat from the eccrine gland.',
    'How would you look for laten marks on a glass only using a light source?',
    'What powders are used in Yorkshire and the Humber?',
    'What brushed are used in Yorkshire and the Humber?',
    'Name two conditions which might effect the recovery of fingerprints.',
    'List all the details that should be included on an acetate lift.',
    'Name the department where exhibits that are unsuitable for fingerprinting can be sent.',
    'What is polydactylism?',
    'What powder can be used on a ceramic surface? (according to Yorkshire and the Humber SOP’s)',
    'What powder can be used on a wet ceramic surface? (according to Yorkshire and the Humber SOP’s)',
    'If you have a fingerprint/area of ridge detail which is clogged, what technique would you use to clear the mark?',
    'Describe the process for cleaning out a mark.',
    'What brush would you use on a UPVC window frame when applying aluminium powder?',
    'What tape would you use when lifting Magneta Flake from a painted wood surface?',
    'Name the first person in the UK to be convicted on fingerprint evidence.',
    'What did Harry Jackson steal from the address?',
  ];

  const handleIncorrect = () => {
    setQuestionIndex(questionIndex + 1);
  };

  const handleCorrect = () => {
    setQuestionIndex(questionIndex + 1);
    navigate('/catchphrase');
  };

  return (
    <>
      <Header />
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
    </>
  );
};
