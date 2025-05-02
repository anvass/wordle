import { MatchLetterResult } from '../types';
import { FaDeleteLeft } from 'react-icons/fa6';
import { AiOutlineEnter } from 'react-icons/ai';
import { matchLetterInWord } from '../utils/matchLetterInWord';
import { COLS_COUNT, ROWS_COUNT } from '../constants';
import { useAppDispatch, useAppSelector } from '../redux/store';
import {
  addWordToEnteredWords,
  finishedGame,
  removeLastLetterInCurrentWord,
  setCurrentWord,
  setModalName,
} from '../redux/appSlice';

function calcLetter(targetWord: string, enteredWords: string[]) {
  const d: Record<string, MatchLetterResult> = {};

  for (const enteredWord of enteredWords) {
    for (let i = 0; i < enteredWord.length; i++) {
      const letter = enteredWord[i];
      const matchResult = matchLetterInWord(letter, i, targetWord);

      if (d[letter] === 'match-total') {
        continue;
      }

      if (d[letter] === 'match-partial') {
        if (matchResult === 'match-total') {
          d[letter] = 'match-total';
        } else {
          continue;
        }
      }

      d[letter] = matchResult;
    }
  }

  return d;
}

function Keyboard() {
  const gameState = useAppSelector((store) => store.appSlice.gameState);
  const dispatch = useAppDispatch();

  const handleLetterRemove = () => {
    if (gameState.currentWord.length > 0) {
      dispatch(removeLastLetterInCurrentWord());
    }
  };

  const handleLetterEnter = (key: string) => {
    if (gameState.isFinished) {
      dispatch(setModalName('reset'));
    }

    if (!gameState.isFinished && gameState.currentWord.length < COLS_COUNT) {
      dispatch(setCurrentWord(key));
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

    if (currentWord === targetWord) {
      dispatch(addWordToEnteredWords(currentWord));
      dispatch(finishedGame());
      dispatch(setModalName('success'));
      return;
    }

    if (gameState.enteredWords.length <= ROWS_COUNT) {
      dispatch(addWordToEnteredWords(currentWord));

      if (gameState.enteredWords.length + 1 === ROWS_COUNT) {
        dispatch(finishedGame());
        dispatch(setModalName('failed'));
        return;
      }
    }
  };

  const letterMatchDictionary = calcLetter(
    gameState.targetWord,
    gameState.enteredWords
  );

  const isFullWord = gameState.currentWord.length === COLS_COUNT;

  function addClass(letter: string): string {
    if (letterMatchDictionary[letter.toLowerCase()] === 'match-total') {
      return 'bg-green-500 text-white';
    }
    if (letterMatchDictionary[letter.toLowerCase()] === 'match-partial') {
      return 'bg-yellow-400 text-white';
    }
    if (letterMatchDictionary[letter.toLowerCase()] === 'match-none') {
      return 'bg-gray-500 text-white';
    }

    return '';
  }

  const KEYS_1ST_ROW = [
    'Й',
    'Ц',
    'У',
    'К',
    'Е',
    'Н',
    'Г',
    'Ш',
    'Щ',
    'З',
    'Х',
    'Ъ',
  ];

  const KEYS_2ND_ROW = ['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э'];

  const KEYS_3RD_ROW = ['Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю'];

  return (
    <div className="flex flex-col w-full max-w-[95%] sm:max-w-xl mx-auto gap-1  py-3 md:py-5">
      <div className="flex gap-1">
        {KEYS_1ST_ROW.map((key: string, index: number) => (
          <button
            key={index}
            className={`${addClass(
              key
            )} flex-1 flex justify-center items-center py-2 sm:px-px box-border uppercase font-semibold text-lg sm:text-xl text-gray-800 bg-gray-200 cursor-pointer`}
            onClick={() => handleLetterEnter(key)}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="flex gap-1">
        {KEYS_2ND_ROW.map((key: string, index: number) => (
          <button
            key={index}
            className={`${addClass(
              key
            )} flex-1 flex justify-center items-center py-2 sm:px-px box-border uppercase font-semibold text-lg sm:text-xl text-gray-800 bg-gray-200 cursor-pointer`}
            onClick={() => handleLetterEnter(key)}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="flex gap-1">
        <button
          className={`flex-1 flex justify-center items-center py-2 sm:px-px box-border uppercase font-semibold text-lg sm:text-xl cursor-pointer ${
            isFullWord ? 'text-white bg-blue-600' : 'text-gray-800 bg-gray-200'
          }`}
          onClick={handleWordEnter}
        >
          <AiOutlineEnter />
        </button>
        {KEYS_3RD_ROW.map((key: string, index: number) => (
          <button
            key={index}
            className={`${addClass(
              key
            )} flex-1 flex justify-center items-center py-2 sm:px-px box-border uppercase font-semibold text-lg sm:text-xl text-gray-800 bg-gray-200 cursor-pointer`}
            onClick={() => handleLetterEnter(key)}
          >
            {key}
          </button>
        ))}
        <button
          className="flex-1 flex justify-center items-center py-2 sm:px-px box-border uppercase font-semibold text-lg sm:text-xl text-gray-800 bg-gray-200 cursor-pointer"
          onClick={handleLetterRemove}
        >
          <FaDeleteLeft />
        </button>
      </div>
    </div>
  );
}

export default Keyboard;
