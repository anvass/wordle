import { useState } from 'react';
import Keyboard from './components/Keyboard';
import Grid from './components/Grid';
import { GameState } from './types';
import words from './dict.json';
import { COLS_COUNT, ROWS_COUNT } from './constants';
import Modal from './components/Modal';
import Header from './components/Header';
import Footer from './components/Footer';
import { AiOutlineEnter } from 'react-icons/ai';
import { FaDeleteLeft } from 'react-icons/fa6';

type ModalName = 'help' | 'success' | 'failed' | 'config';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    enteredWords: [],
    currentWord: '',
    targetWord: words[Math.floor(Math.random() * words.length)],
  });

  const [modalName, setModalName] = useState<ModalName | null>(null);

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
    </>
  );
}

function ModalContainer({
  modalName,
  setModalName,
  onReset,
}: {
  modalName: null | string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setModalName: Function;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  onReset: Function;
}) {
  if (!modalName) {
    return null;
  }
  if (modalName === 'help') {
    return (
      <Modal onClose={() => setModalName(null)} title={'Помощь'}>
        <div className="text-left flex flex-col gap-4">
          <div>
            <p>
              Вордл - это простая и увлекательная головоломка, в которой нужно
              угадать слово из 5 букв за 6 попыток.
            </p>
          </div>
          <div>
            <p className="mb-2 font-semibold text-center">Как играть?</p>
            <ol>
              <li>Введите любое слово из пяти букв</li>
              <li>
                Нажмите
                <span className="inline-block px-1 align-middle">
                  <FaDeleteLeft />
                </span>
                , если ошиблисть при вводе
              </li>
              <li>
                Нажмите
                <span className="inline-block px-1 align-middle">
                  <AiOutlineEnter />
                </span>
                для проверки введенного слова
              </li>
              <li>
                <p>
                  После каждой попытки буквы будут подсвечены разными цветами:
                </p>
                <ul>
                  <li>
                    🟢 Зелёный цвет означает, что буква находится на правильном
                    месте в слове
                  </li>
                  <li>
                    🟡 Жёлтый цвет показывает, что буква есть в слове, но стоит
                    не там
                  </li>
                  <li>
                    ⬜ Серый цвет указывает, что такой буквы нет в загаданном
                    слове
                  </li>
                </ul>
              </li>
            </ol>
          </div>
          <div>
            <p className="mb-2 font-semibold text-center">Условия победы</p>
            <ul>
              <li>
                Вы выигрываете, если угадаете слово раньше, чем закончатся
                попытки
              </li>
              <li>Если все попытки исчерпаны, игра заканчивается проигрышем</li>
            </ul>
          </div>
        </div>
        <div className="flex mt-4">
          <button
            onClick={() => {
              onReset();
            }}
            className="w-full p-3 rounded-md text-lg bg-blue-600 text-white uppercase hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Все понятно
          </button>
        </div>
      </Modal>
    );
  }
  if (modalName === 'success') {
    return (
      <Modal onClose={() => setModalName(null)} title={'Победа!'}>
        <p>Поздравляем!</p>
        <p>Вы отгадали слово!</p>
        <div className="flex mt-4">
          <button
            onClick={() => {
              onReset();
            }}
            className="w-full p-3 rounded-md text-lg bg-blue-600 text-white uppercase hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Начать заново
          </button>
        </div>
      </Modal>
    );
  }
  if (modalName === 'failed') {
    return (
      <Modal onClose={() => setModalName(null)} title={'Неудача'}>
        <p>К сожалению, вы не отгадали!</p>
        <p>Попробуете снова?</p>
        <div className="flex mt-4">
          <button
            onClick={() => onReset()}
            className="w-full p-3 rounded-md text-lg bg-blue-600 text-white uppercase hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Начать заново
          </button>
        </div>
      </Modal>
    );
  }
}

export default App;
