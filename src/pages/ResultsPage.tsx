import React from "react";
import { Location, useLocation, useNavigate } from "react-router-dom";

interface UseLocationState {
  correctAnswersCount: number;
}

const totalAnswersCount = 26;

const ResultsPage: React.FC = () => {
  const { state }: Location<UseLocationState> = useLocation();
  const navigate = useNavigate();

  const correctAnswersCount = state.correctAnswersCount;

  const handleBackClick = () => {
    navigate("/");
  };

  let message;
  if (correctAnswersCount === 0) {
    message =
      "You got nothing right! What the hell were you even doing? This is a complete disaster!";
  } else if (correctAnswersCount < totalAnswersCount) {
    message = "You got some answers correct. Keep practicing!";
  } else {
    message = "Congratulations! You got all the answers correct. Well done!";
  }

  return (
    <div>
      <button className="back-btn" onClick={handleBackClick}>
        restart
      </button>
      <h4>Results</h4>
      <h4>{message}</h4>
    </div>
  );
};

export default ResultsPage;
