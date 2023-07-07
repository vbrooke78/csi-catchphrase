import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import crimeScenePhoto from '../images/crime-scene.jpg';
import defeat from '../images/defeat.jpeg';
import first_aid from '../images/first_aid.jpeg';
import jackpot from '../images/jackpot.jpeg';
import milkshake from '../images/milkshake.jpeg';
import sweetheart from '../images/sweetheart.jpeg';
import revealNoise from '../audio/Catchphrase_Reveal.mp3';
import { Square } from '../components/Square';

export const Catchphrase = ({
  squareVisibility,
  setSquareVisibility,
  imageIndex,
  setImageIndex,
}) => {
  const [randomIndex, setRandomIndex] = useState();
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [isFlashing, setIsFlashing] = useState(true); // New state to track flashing status
  const navigate = useNavigate();

  // Create a ref for the intervalId
  const intervalIdRef = useRef(null);

  // Create a ref for the audio element
  const revealAudioRef = useRef(null);

  const images = [
    crimeScenePhoto,
    defeat,
    first_aid,
    jackpot,
    milkshake,
    sweetheart,
  ];

  const handleSquareClick = (index) => {
    setSquareVisibility((prevVisibility) => {
      const updatedVisibility = [...prevVisibility];
      updatedVisibility[index] = !updatedVisibility[index];
      return updatedVisibility;
    });

    // If the square is clicked and hidden, update the highlighted index if needed
    if (squareVisibility[index]) {
      setHighlightedIndex(null);
    }
  };

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
    // Stop the random highlighting function by clearing the interval
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
    navigate('/question');
  };

  const handleRevealAll = () => {
    setSquareVisibility(Array(9).fill(false));
  };

  return (
    <section className="catchphrase">
      <section className="catchphrase-container">
        <section className="image-container">
          <div className="grid-container">
            {/* Render the image */}
            <img className="image" alt="crime scene" src={images[imageIndex]} />
            {/* Render the 9 squares */}
            {squareVisibility.map((visible, index) => (
              <Square
                key={index}
                visible={visible}
                highlighted={highlightedIndex === index} // Pass the highlighted state to Square component
                onClick={() => handleSquareClick(index)}
                isFlashing={isFlashing}
                randomIndex={randomIndex}
                index={index}
                squareVisibility={squareVisibility}
              />
            ))}
          </div>
        </section>
      </section>
      <section className="reveal-button-container">
        <button className="catchphrase-btn" onClick={handleRandomReveal}>
          Random reveal
        </button>
        <button className="catchphrase-btn" onClick={handleNextQuestion}>
          Next question
        </button>
        <button className="catchphrase-btn" onClick={handleRevealAll}>
          Reveal all
        </button>
      </section>
      {/* Add the audio element to play the reveal sound effect */}
      <audio ref={revealAudioRef} src={revealNoise} />
    </section>
  );
};
