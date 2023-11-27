import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { data } from '../data/data';
import revealNoise from '../audio/Catchphrase_Reveal.mp3';
import '../styles/buttons.css';

export const Buttons = ({
  squareVisibility,
  setSquareVisibility,
  isFlashing,
  setIsFlashing,
  randomIndex,
  setShowAnswer,
  setHighlightedIndex,
  imageIndex,
  setImageIndex,
}) => {
  const navigate = useNavigate();

  // Create a ref for the audio element
  const revealAudioRef = useRef(null);

  const handleRandomReveal = () => {
    // Stop the random highlighting function by altering the state
    setIsFlashing(!isFlashing);

    // Play the reveal sound effect
    if (revealAudioRef.current) {
      revealAudioRef.current.play();
    }

    // Hide the square corresponding to the current random index after a delay
    setTimeout(() => {
      if (randomIndex !== null) {
        setSquareVisibility((prevVisibility) => {
          const updatedVisibility = [...prevVisibility];
          updatedVisibility[randomIndex] = false;
          return updatedVisibility;
        });
      }
    }, 2000); // Adjust the delay as needed

    // Reset the highlighted index state after a delay
    setTimeout(() => {
      setHighlightedIndex(null);
    }, 3000); // Adjust the delay as needed
  };

  const handleNextQuestion = () => {
    // If all squares revealed reset catchphrase before navigating to next question
    if (!squareVisibility.includes(true)) {
      setSquareVisibility(Array(9).fill(true));
      setImageIndex(imageIndex + 1);
    }
    // If all catchphrases have been used don't navigate to next question, show game over screen
    if (imageIndex >= data.length - 1) {
      navigate('/catchphrase');
    } else {
      navigate('/question');
    }
  };

  const handleRevealAll = () => {
    setSquareVisibility(Array(9).fill(false));
  };
  return (
    <section className="reveal-button-container">
      {/* Only show the button if some squares are still visible */}
      {squareVisibility.includes(true) ? (
        <button className="catchphrase-btn" onClick={handleRandomReveal}>
          Random reveal
        </button>
      ) : null}
      <button className="catchphrase-btn" onClick={handleNextQuestion}>
        Next question
      </button>
      {/* Only show the button if some squares are still visible */}
      {squareVisibility.includes(true) ? (
        <button className="catchphrase-btn" onClick={handleRevealAll}>
          Reveal all
        </button>
      ) : null}
      {/* Only show the button if no squares are visible */}
      {!squareVisibility.includes(true) && (
        <button className="catchphrase-btn" onClick={() => setShowAnswer(true)}>
          Show answer
        </button>
      )}
      {/* Add the audio element to play the reveal sound effect */}
      <audio ref={revealAudioRef} src={revealNoise} />
    </section>
  );
};
