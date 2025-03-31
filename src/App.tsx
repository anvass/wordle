import { useState } from 'react';
import Keyboard from './components/Keyboard';
import Grid from './components/Grid';
import { GameState } from './types';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    enteredWords: ['осень', 'весна'],
    currentWord: '',
    guessWord: 'пилот',
  });

  const handleLetterEnter = (key: string) => {
    // - когда ввожу буквы, изменяем currentWord и проверяем его длину

    // когда нажимаю на ввод
    // - проверяем можно ли добавить в enteredWords
    // - проверяем победили ли мы

    if (gameState.currentWord.length < 5) {
      setGameState((prevState) => ({
        ...prevState,
        currentWord: prevState.currentWord + key,
      }));
    }
  };

  // - когда нажимаю на крестик, изменяем currentWord
  const handleLetterRemove = () => {
    if (gameState.currentWord.length > 0) {
      setGameState((prevState) => ({
        ...prevState,
        currentWord: prevState.currentWord.slice(0, -1),
      }));
    }
  };

  const handleWordEnter = (key: string) => {};

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
