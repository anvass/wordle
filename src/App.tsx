import { useState } from 'react';
import Keyboard from './components/Keyboard';
import Grid from './components/Grid';
import { GameState } from './types';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    enteredWords: ['осень', 'весна'],
    currentWord: '',
    targetWord: 'пилот',
  });

  const handleLetterEnter = (key: string) => {
    if (gameState.currentWord.length < 5) {
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

    if (currentWord.length !== 5) {
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

    if (gameState.enteredWords.length < 5) {
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
      <h1 className="text-center text-3xl font-bold uppercase">Wordle</h1>
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
