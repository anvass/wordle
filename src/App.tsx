import { useState } from 'react';
import Keyboard from './components/Keyboard';
import Grid from './components/Grid';
import { GameState } from './types';
import words from './dict.json';
import { COLS_COUNT, ROWS_COUNT } from './constants';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    enteredWords: ['осень', 'весна'],
    currentWord: '',
    targetWord: words[Math.floor(Math.random() * words.length)],
  });

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
      return;
    }

    if (currentWord === targetWord) {
      setGameState((prevState) => ({
        ...prevState,
        enteredWords: [...prevState.enteredWords, currentWord],
        currentWord: '',
      }));
      alert('Вы угадали загаданное слово!');
      return;
    }

    if (gameState.enteredWords.length < ROWS_COUNT - 1) {
      setGameState((prevState) => ({
        ...prevState,
        enteredWords: [...prevState.enteredWords, currentWord],
        currentWord: '',
      }));
    } else {
      alert('Вы проиграли! Попробуете снова?');
      // reloadpage();
      return;
    }
  };

  return (
    <>
      <br />
      <h1 className="text-center text-5xl md:text-6xl tracking-wide uppercase">
        Wordle
      </h1>
      <br />
      <Grid gameState={gameState} />
      <br />
      <Keyboard
        gameState={gameState}
        onLetterEnter={handleLetterEnter}
        onLetterRemove={handleLetterRemove}
        onWordEnter={handleWordEnter}
      />
      <br />
    </>
  );
}

export default App;
