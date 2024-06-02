import { useState } from "react";
import TimersGenerator from "../components/TimersGenerator";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedTimer, setSelectedTimer] = useState<number | null>(null);
  const handleStartClick = () => {
    navigate("/game", { state: { selectedTimer: selectedTimer } });
  };

  const handleTimerOnClick = (timerId: number) => {
    setSelectedTimer(timerId);
  };
  return (
    <>
      <div className="timer_container">
        <p id="timer_title" className="timer_title">
          Select Timer
        </p>

        <TimersGenerator
          timersCount={4}
          onTimerOnClick={handleTimerOnClick}
          selectedTimer={selectedTimer}
        />

        <button
          onClick={handleStartClick}
          className={!selectedTimer ? "btn disabled" : "btn"}
          disabled={!selectedTimer}
        >
          Start
        </button>
      </div>
    </>
  );
};

export default HomePage;
