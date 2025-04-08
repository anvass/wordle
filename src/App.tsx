import { useState } from 'react';
import Keyboard from './components/Keyboard';
import Grid from './components/Grid';
import { GameState } from './types';
import words from './dict.json';
import { COLS_COUNT, ROWS_COUNT } from './constants';
import Modal from './components/Modal';
import Header from './components/Header';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    enteredWords: [],
    currentWord: '',
    targetWord: words[Math.floor(Math.random() * words.length)],
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccessGame, setIsSuccessGame] = useState(false);

  const handleLetterEnter = (key: string) => {
    if (gameState.currentWord.length < COLS_COUNT) {
      setGameState((prevState) => ({
        ...prevState,
        currentWord: prevState.currentWord + key,
      }));
    }
  };

  const handleLetterRemove = () => {
    if (gameState.currentWord.length > 0) {
      setGameState((prevState) => ({
        ...prevState,
        currentWord: prevState.currentWord.slice(0, -1),
      }));
    }
  };

  console.log(gameState);

  const handleResetGame = () => {
    setGameState(() => ({
      enteredWords: [],
      currentWord: '',
      targetWord: words[Math.floor(Math.random() * words.length)],
    }));
    setIsOpen(false);
  };

  const handleWordEnter = () => {
    const currentWord = gameState.currentWord.toLowerCase();
    const targetWord = gameState.targetWord.toLowerCase();

    if (
      currentWord.length !== COLS_COUNT ||
      gameState.enteredWords.length === ROWS_COUNT
    ) {
      return;
    }

    if (!words.includes(currentWord)) {
      alert('В словаре нет такого слова. Попробуйте другое!');
      setGameState((prevState) => ({
        ...prevState,
        currentWord: '',
      }));
      return;
    }

    if (currentWord === targetWord) {
      setGameState((prevState) => ({
        ...prevState,
        enteredWords: [...prevState.enteredWords, currentWord],
        currentWord: '',
      }));
      setIsSuccessGame(true);
      setIsOpen(true);
      return;
    }

    if (gameState.enteredWords.length < ROWS_COUNT - 1) {
      setGameState((prevState) => ({
        ...prevState,
        enteredWords: [...prevState.enteredWords, currentWord],
        currentWord: '',
      }));
    } else {
      setIsSuccessGame(false);
      setIsOpen(true);
      return;
    }
  };

  return (
    <>
      <Header />
      <Grid gameState={gameState} />
      <br />
      <Keyboard
        gameState={gameState}
        onLetterEnter={handleLetterEnter}
        onLetterRemove={handleLetterRemove}
        onWordEnter={handleWordEnter}
      />
      <br />
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={isSuccessGame ? 'Победа!' : 'Неудача :('}
        onReset={() => handleResetGame()}
      >
        <div className="space-y-4 text-center text-md">
          {isSuccessGame ? (
            <p>
              Поздравляем!<br></br>Вы отгадали слово!
            </p>
          ) : (
            <p>
              К сожалению, вы не отгадали!<br></br>Попробуете снова?
            </p>
          )}
        </div>
      </Modal>
    </>
  );
}

export default App;
