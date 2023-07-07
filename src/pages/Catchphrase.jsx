import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import crimeScenePhoto from '../images/crime-scene.jpg';
import defeat from '../images/defeat.jpeg';
import first_aid from '../images/first_aid.jpeg';
import jackpot from '../images/jackpot.jpeg';
import milkshake from '../images/milkshake.jpeg';
import sweetheart from '../images/sweetheart.jpeg';
import { Square } from '../components/Square';

export const Catchphrase = ({
  squareVisibility,
  setSquareVisibility,
  imageIndex,
  setImageIndex,
}) => {
  const [randomIndex, setRandomIndex] = useState();
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const navigate = useNavigate();

  // Create a ref for the intervalId
  const intervalIdRef = useRef(null);

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
    // Function to highlight a random square
    const highlightRandomSquare = () => {
      const visibleSquares = squareVisibility
        .map((visible, index) => (visible ? index : -1))
        .filter((index) => index !== -1);
      setRandomIndex(
        visibleSquares[Math.floor(Math.random() * visibleSquares.length)]
      );
      setHighlightedIndex(randomIndex);
    };
    const intervalId = setInterval(highlightRandomSquare, 150); // Adjust the interval time (in milliseconds) for the flashing effect

    // Assign the intervalId to the ref
    intervalIdRef.current = intervalId;

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [squareVisibility, randomIndex]);

  const handleRandomReveal = () => {
    // Stop the random highlighting function by clearing the interval
    clearInterval(intervalIdRef.current);

    // Hide the square corresponding to the current random index
    if (randomIndex !== null) {
      setSquareVisibility((prevVisibility) => {
        const updatedVisibility = [...prevVisibility];
        updatedVisibility[randomIndex] = false;
        return updatedVisibility;
      });
    }

    // Reset the highlighted index state
    setHighlightedIndex(null);
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
      <h2>Can you guess the catchphrase?</h2>

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
    </section>
  );
};
