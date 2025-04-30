import { useState } from 'react';
import Keyboard from './components/Keyboard';
import Grid from './components/Grid';
import { ModalName } from './types';
import { COLS_COUNT, ROWS_COUNT } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import ModalContainer from './components/ModalContainer';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { useAppDispatch, useAppSelector } from './redux/store';
import {
  setCurrentWord,
  removeLastLetterInCurrentWord,
  resetGame,
  addWordToEnteredWords,
} from './redux/appSlice';

function App() {
  const gameState = useAppSelector((store) => store.appSlice.gameState);
  const dispatch = useAppDispatch();

  const { width, height } = useWindowSize();
  const [needConfetti, setNeedConfetti] = useState<boolean>(false);
  const [modalName, setModalName] = useState<ModalName | null>('help');

  const handleLetterEnter = (key: string) => {
    if (gameState.currentWord.length < COLS_COUNT) {
      dispatch(setCurrentWord(key));
    }
  };

  const handleLetterRemove = () => {
    if (gameState.currentWord.length > 0) {
      dispatch(removeLastLetterInCurrentWord());
    }
  };

  const handleResetGame = () => {
    dispatch(resetGame());
    setNeedConfetti(false);
    setModalName(null);
  };

  const handleCloseModal = () => {
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

    // if (!words.includes(currentWord)) {
    //   alert('В словаре нет такого слова. Попробуйте другое!');
    //   setGameState((prevState) => ({
    //     ...prevState,
    //     currentWord: '',
    //   }));
    //   return;
    // }

    if (currentWord === targetWord) {
      dispatch(addWordToEnteredWords(currentWord));
      setModalName('success');
      setNeedConfetti(true);
      return;
    }

    if (gameState.enteredWords.length < ROWS_COUNT - 1) {
      dispatch(addWordToEnteredWords(currentWord));
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
        <Grid />
        <Keyboard
          onLetterEnter={handleLetterEnter}
          onLetterRemove={handleLetterRemove}
          onWordEnter={handleWordEnter}
        />
        <ModalContainer
          modalName={modalName}
          setModalName={setModalName}
          onReset={handleResetGame}
          onClose={handleCloseModal}
        />
        <Footer onHelpClick={handleHelpClick} />
        {needConfetti && (
          <Confetti width={width} height={height} recycle={false} />
        )}
      </div>
    </>
  );
}

export default App;
