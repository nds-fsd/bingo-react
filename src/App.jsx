import { useEffect, useState } from 'react'
import styles from './app.module.css'
import './App.css'
import Display from './components/display/display'
import Board from './components/board/board'
import Roll from './components/roll/roll'
import ResetBingo from './components/reset/reset'

function App() {
  const [displayValue, setDisplayValue] = useState('Start!');
  const [bingoNumbers, setBingoNumbers] = useState(Array(50).fill(false));
  const [completed, setCompleted] = useState(false);

  const onRoll = () => {
    if (completed) {
      setDisplayValue('Completed!');
      return;
    }
    let randomNumber = Math.floor(Math.random() * 50);
    if (!completed && bingoNumbers[randomNumber]) {
      onRoll();
      return;
    }
    setDisplayValue(randomNumber + 1);
    setBingoNumbers(bingoNumbers.map((number, index) => {
      if (index === randomNumber) {
        return true;
      }
      return number;
    }));
  };

  const onReset = () => {
    setDisplayValue(0);
    setBingoNumbers(Array(50).fill(false));
    setCompleted(false);
  };

  useEffect(() => {
    const isCompleted = bingoNumbers.every((number) => number);
    setCompleted(isCompleted);
  }, [bingoNumbers]);

  return (
    <>
      <h1>React Bingo!</h1>
      <div>
        <Display value={displayValue} />
        <div className={styles.buttons}>
          <Roll onRoll={onRoll} />
          <ResetBingo onReset={onReset} />
        </div>
        
      </div>
      <div>
        <Board bungoNumbers={bingoNumbers} />
      </div>
    </>
  );
};

export default App
