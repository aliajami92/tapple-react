import { useEffect, useState } from "react";
import { useLocation, useNavigate, type Location } from "react-router-dom";

interface UseLocationState {
  selectedTimer: number;
}

const keyboardLayout = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const GamePage = () => {
  const { state }: Location<UseLocationState> = useLocation();
  const navigate = useNavigate();

  const [timerValue, setTimerValue] = useState(state.selectedTimer);
  const [isActive, setIsActive] = useState(true);
  const [answer, setAnswer] = useState("");
  const [answerList, setAnswerList] = useState<string[]>([]);

  const handleBackClick = () => {
    navigate("/");
  };

  useEffect(() => {
    let timer: number;
    if (isActive && timerValue > 0) {
      timer = setInterval(() => {
        setTimerValue((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timerValue === 0) {
      setIsActive(false);
      navigate("/results", {
        state: { correctAnswersCount: answerList.length },
      });
    }

    // Cleanup interval on component unmount or when time is up
    return () => clearInterval(timer);
  }, [isActive, timerValue, navigate, answerList]);

  const resetTimer = () => {
    setTimerValue(15);
    setIsActive(true);
  };

  useEffect(() => {
    // Define the handler function
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      const key = event.key.toUpperCase();

      if (key.match(/[A-Z]/) && !answerList.includes(key)) {
        setAnswer(key);
      }

      if (event.code === "Space" && answer && isActive) {
        setAnswerList((prev) => [...prev, answer]);
        resetTimer();
        setAnswer("");
      }
    };
    if (answerList.length === 26) {
      navigate("/results", {
        state: { correctAnswersCount: answerList.length },
      });
    }
    // Add the event listener when the component mounts
    document.addEventListener("keydown", handleKeyDown);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [answer, isActive, answerList, navigate]);

  console.log(answerList);

  return (
    <div className="game-container">
      <button className="back-btn" onClick={handleBackClick}>
        back
      </button>
      <div className="timer-container">
        <p className="item_btn selected"> {timerValue}</p>
      </div>
      <div className="keyboard_container">
        {keyboardLayout.map((row, index) => (
          <ul className="keys_container" key={index}>
            {row.map((key) => (
              <li
                key={key}
                className={`keyboard_item ${
                  answerList.includes(key) ? "disabled" : ""
                } ${answer === key ? "selected" : ""}`}
              >
                {key}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default GamePage;
