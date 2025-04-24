import { useState } from 'react';
import Keyboard from './components/Keyboard';
import Grid from './components/Grid';
import { GameState, ModalName } from './types';
import words from './dict.json';
import { COLS_COUNT, ROWS_COUNT } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import ModalContainer from './components/ModalContainer';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    enteredWords: [],
    currentWord: '',
    targetWord: words[Math.floor(Math.random() * words.length)],
  });

  const [modalName, setModalName] = useState<ModalName | null>('help');

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
    setModalName(null);
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
      setModalName('success');
      return;
    }

    if (gameState.enteredWords.length < ROWS_COUNT - 1) {
      setGameState((prevState) => ({
        ...prevState,
        enteredWords: [...prevState.enteredWords, currentWord],
        currentWord: '',
      }));
    } else {
      setModalName('failed');
      return;
    }
  };

  const handleHelpClick = () => setModalName('help');

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header onHelpClick={handleHelpClick} />
        <Grid gameState={gameState} />
        <Keyboard
          gameState={gameState}
          onLetterEnter={handleLetterEnter}
          onLetterRemove={handleLetterRemove}
          onWordEnter={handleWordEnter}
        />
        <ModalContainer
          modalName={modalName}
          setModalName={setModalName}
          onReset={handleResetGame}
        />
        <Footer onHelpClick={handleHelpClick} />
      </div>
    </>
  );
}

export default App;
