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

  const handleKeyboardEnter = (key: string) => {
    // - когда ввожу буквы, изменяем currentWord и проверяем его длину
    // - когда нажимаю на крестик, изменяем currentWord
    // когда нажимаю на ввод
    // - проверяем можно ли добавить в enteredWords
    // - проверяем победили ли мы



    
  };

  return (
    <>
      <h1 className="text-center text-3xl font-bold uppercase">Wordle</h1>
      <Grid gameState={gameState} />
      <Keyboard gameState={gameState} onEnter={handleKeyboardEnter} />
    </>
  );
}

export default App;
