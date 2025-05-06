import { MatchLetterResult } from '../types';
import { FaDeleteLeft } from 'react-icons/fa6';
import { AiOutlineEnter } from 'react-icons/ai';
import { matchLetterInWord } from '../utils/matchLetterInWord';
import { COLS_COUNT } from '../constants';
import { useAppDispatch, useAppSelector } from '../redux/store';
import {
  enterLetter,
  enterWord,
  removeLetter,
  setError,
} from '../redux/appSlice';
import words from '../dict.json';

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
    dispatch(removeLetter());
  };

  const handleLetterEnter = (key: string) => {
    dispatch(enterLetter(key));
  };

  const handleWordEnter = () => {
    if (
      gameState.enteredWords.includes(gameState.currentWord) ||
      !words.includes(gameState.currentWord)
    ) {
      dispatch(setError());
      return;
    } else {
      dispatch(enterWord());
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
    <div className="flex flex-col w-full gap-1 mb-4 sm:my-8">
      <div className="flex justify-center gap-1">
        {KEYS_1ST_ROW.map((key: string, index: number) => (
          <button
            key={index}
            className={`${addClass(
              key
            )} flex-1 flex justify-center items-center p-1 sm:p-2 box-border uppercase font-semibold text-lg sm:text-xl rounded-sm text-gray-800 bg-gray-200 cursor-pointer`}
            onClick={() => handleLetterEnter(key)}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-1">
        {KEYS_2ND_ROW.map((key: string, index: number) => (
          <button
            key={index}
            className={`${addClass(
              key
            )} flex-1 flex justify-center items-center p-1 sm:p-2 box-border uppercase font-semibold text-lg sm:text-xl rounded-sm text-gray-800 bg-gray-200 cursor-pointer`}
            onClick={() => handleLetterEnter(key)}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-1">
        <button
          className={`flex-1 flex justify-center items-center p-1 sm:p-2 box-border uppercase font-semibold text-lg sm:text-xl rounded-sm cursor-pointer ${
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
            )} flex-1 flex justify-center items-center p-1 sm:p-2 box-border uppercase font-semibold text-lg sm:text-xl rounded-sm text-gray-800 bg-gray-200 cursor-pointer`}
            onClick={() => handleLetterEnter(key)}
          >
            {key}
          </button>
        ))}
        <button
          className="flex-1 flex justify-center items-center p-1 sm:p-2 box-border uppercase font-semibold text-lg sm:text-xl rounded-sm text-gray-800 bg-gray-200 cursor-pointer"
          onClick={handleLetterRemove}
        >
          <FaDeleteLeft />
        </button>
      </div>
    </div>
  );
}

export default Keyboard;
