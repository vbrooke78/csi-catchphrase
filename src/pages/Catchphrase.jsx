import React, { useEffect, useState, useRef } from 'react';
import { Square } from '../components/Square';
import { data } from '../data/data';
import thanksForPlayingImg from '../images/Thanks for playing.jpeg';
import '../styles/catchphrase.css';
import { Buttons } from '../components/Buttons';
import { RestartGame } from '../components/RestartGame';

// Only render buttons if there are still new catchphrases to display - otherwise render restart button

export const Catchphrase = ({
  squareVisibility,
  setSquareVisibility,
  imageIndex,
  setImageIndex,
  setQuestionIndex,
}) => {
  const [randomIndex, setRandomIndex] = useState();
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [isFlashing, setIsFlashing] = useState(true); // New state to track flashing status
  const [showAnswer, setShowAnswer] = useState(false);

  // Create a ref for the intervalId
  const intervalIdRef = useRef(null);

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

  return (
    <section className="catchphrase">
      <section className="catchphrase-container">
        <section className="image-container">
          {imageIndex < data.length && showAnswer && (
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
      {imageIndex < data.length ? (
        <Buttons
          squareVisibility={squareVisibility}
          setSquareVisibility={setSquareVisibility}
          isFlashing={isFlashing}
          setIsFlashing={setIsFlashing}
          randomIndex={randomIndex}
          setHighlightedIndex={setHighlightedIndex}
          imageIndex={imageIndex}
          setImageIndex={setImageIndex}
          setShowAnswer={setShowAnswer}
        />
      ) : (
        <RestartGame
          setQuestionIndex={setQuestionIndex}
          setImageIndex={setImageIndex}
          setSquareVisibility={setSquareVisibility}
          classname={'restart-btn'}
        />
      )}
    </section>
  );
};
