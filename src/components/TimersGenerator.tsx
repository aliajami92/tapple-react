interface TimersGeneratorProps {
  timersCount: number;
  onTimerOnClick: (index: number) => void;
  selectedTimer: number | null;
}

const TimersGenerator = ({
  timersCount,
  onTimerOnClick,
  selectedTimer,
}: TimersGeneratorProps) => {
  const timers = Array.from({ length: timersCount }, (_, index) => index + 1);

  return (
    <ul className="timer">
      {timers.map((timer) => {
        const timerValue = timer * 5 + 5;
        return (
          <li
            className={
              timerValue === selectedTimer ? "item_btn selected" : "item_btn"
            }
            key={timerValue}
            onClick={() => onTimerOnClick(timerValue)}
          >
            {timerValue}
          </li>
        );
      })}
    </ul>
  );
};

export default TimersGenerator;
