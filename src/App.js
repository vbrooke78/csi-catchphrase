// General imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import { Catchphrase } from './pages/Catchphrase';
import { HomePage } from './pages/HomePage';
import { QuestionPage } from './pages/QuestionPage';

// CSS
import './App.css';
import { useState } from 'react';
import { Header } from './layout/Header';

// App
function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [squareVisibility, setSquareVisibility] = useState(Array(9).fill(true));

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={[
              <Header
                setQuestionIndex={setQuestionIndex}
                setImageIndex={setImageIndex}
                setSquareVisibility={setSquareVisibility}
              />,
              <HomePage />,
            ]}
          />
          <Route
            path="/question"
            element={[
              <Header
                setQuestionIndex={setQuestionIndex}
                setImageIndex={setImageIndex}
                setSquareVisibility={setSquareVisibility}
              />,
              <QuestionPage
                questionIndex={questionIndex}
                setQuestionIndex={setQuestionIndex}
              />,
            ]}
          />
          <Route
            path="/catchphrase"
            element={
              <Catchphrase
                squareVisibility={squareVisibility}
                setSquareVisibility={setSquareVisibility}
                imageIndex={imageIndex}
                setImageIndex={setImageIndex}
                setQuestionIndex={setQuestionIndex}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
