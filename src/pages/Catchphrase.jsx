import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import revealNoise from '../audio/Catchphrase_Reveal.mp3';
import { Square } from '../components/Square';
import { data } from '../data/data';
import thanksForPlayingImg from '../images/Thanks for playing.jpeg';
import '../styles/catchphrase.css';

export const Catchphrase = ({
  squareVisibility,
  setSquareVisibility,
  imageIndex,
  setImageIndex,
}) => {
  const [randomIndex, setRandomIndex] = useState();
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [isFlashing, setIsFlashing] = useState(true); // New state to track flashing status
  const [showAnswer, setShowAnswer] = useState(false);
  const navigate = useNavigate();

  // Create a ref for the intervalId
  const intervalIdRef = useRef(null);

  // Create a ref for the audio element
  const revealAudioRef = useRef(null);

  useEffect(() => {
    const highlightRandomSquare = () => {
      const visibleSquares = squareVisibility
        .map((visible, index) => (visible ? index : -1))
        .filter((index) => index !== -1);
      setRandomIndex(
        visibleSquares[Math.floor(Math.random() * visibleSquares.length)]
      );
      setHighlightedIndex(randomIndex);
    };

    if (isFlashing) {
      const intervalId = setInterval(highlightRandomSquare, 150);
      intervalIdRef.current = intervalId;
    } else {
      clearInterval(intervalIdRef.current);
      setHighlightedIndex(null);
    }

    return () => clearInterval(intervalIdRef.current);
  }, [squareVisibility, randomIndex, isFlashing]);

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
    console.log(imageIndex, data.length);
    if (imageIndex === data.length - 1) {
      navigate('/catchphrase');
    } else {
      navigate('/question');
    }
  };

  const handleRevealAll = () => {
    setSquareVisibility(Array(9).fill(false));
  };

  return (
    <section className="catchphrase">
      <section className="catchphrase-container">
        <section className="image-container">
          {showAnswer && (
            <div className="answer">{data[imageIndex].answer}</div>
          )}
          <section className="grid-container">
            {imageIndex < data.length ? (
              <img
                className="image"
                alt="crime scene"
                src={data[imageIndex].image}
              />
            ) : (
              <img
                className="image"
                alt="crime scene"
                src={thanksForPlayingImg}
              />
            )}
            {/* Render the 9 squares */}
            {imageIndex < data.length
              ? squareVisibility.map((visible, index) => (
                  <Square
                    key={index}
                    visible={visible}
                    highlighted={highlightedIndex === index} // Pass the highlighted state to Square component
                    isFlashing={isFlashing}
                    randomIndex={randomIndex}
                    index={index}
                    squareVisibility={squareVisibility}
                  />
                ))
              : null}
          </section>
        </section>
      </section>
      <section className="reveal-button-container">
        {squareVisibility.includes(true) ? (
          <button className="catchphrase-btn" onClick={handleRandomReveal}>
            Random reveal
          </button>
        ) : null}
        <button className="catchphrase-btn" onClick={handleNextQuestion}>
          Next question
        </button>
        {squareVisibility.includes(true) ? (
          <button className="catchphrase-btn" onClick={handleRevealAll}>
            Reveal all
          </button>
        ) : null}
        {!squareVisibility.includes(true) && (
          <button
            className="catchphrase-btn"
            onClick={() => setShowAnswer(true)}
          >
            Show answer
          </button>
        )}
      </section>
      {/* Add the audio element to play the reveal sound effect */}
      <audio ref={revealAudioRef} src={revealNoise} />
    </section>
  );
};
