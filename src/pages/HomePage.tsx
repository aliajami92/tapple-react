import { useState } from "react";
import TimersGenerator from "../components/TimersGenerator";
import { useNavigate } from "react-router-dom";
import { createGame } from "../lib/apis";
import { nanoid } from "nanoid";

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedTimer, setSelectedTimer] = useState<number | null>(null);
  const [gameCode, setGameCode] = useState<string>("");
  const [playerName, setPlayerName] = useState<string>("");

  const handleTimerOnClick = (timerId: number) => {
    setSelectedTimer(timerId);
  };

  const handleOnCreate = () => {
    // 1. get selected timer value
    // 2. generate a random gameID
    // 3. create game on DB level.
    // 4. retrun game.
    if (!selectedTimer) return;

    const code = nanoid(4);
    const playerCode = nanoid(4);

    createGame(selectedTimer, code, playerCode, playerName);

    localStorage.setItem("playerId", playerCode);
    navigate(`/lobby/${code}`);
  };

  return (
    <>
      <div className="timer_container">
        <p id="timer_title" className="timer_title">
          Create Game
        </p>
        <TimersGenerator
          timersCount={4}
          onTimerOnClick={handleTimerOnClick}
          selectedTimer={selectedTimer}
        />

        <input
          type="text"
          name="playerName"
          id="playerName"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />

        <button
          onClick={handleOnCreate}
          className={!selectedTimer ? "btn disabled" : "btn"}
          disabled={!selectedTimer || !playerName}
        >
          Create Game
        </button>
      </div>
    </>
  );
};

export default HomePage;
