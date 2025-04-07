import { GameState, MatchLetterResult } from '../types';
import { FaDeleteLeft } from 'react-icons/fa6';
import { AiOutlineEnter } from 'react-icons/ai';
import { matchLetterInWord } from '../utils/matchLetterInWord';

interface KeyboardProps {
  gameState: GameState;
  onLetterEnter: (key: string) => void;
  onLetterRemove: () => void;
  onWordEnter: () => void;
}

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

function Keyboard({
  gameState,
  onLetterEnter,
  onLetterRemove,
  onWordEnter,
}: KeyboardProps) {
  const letterMatchDictionary = calcLetter(
    gameState?.targetWord,
    gameState?.enteredWords
  );

  function addClass(letter: string): string {
    if (letterMatchDictionary[letter.toLowerCase()] === 'match-total') {
      return 'bg-green-400 text-white';
    }
    if (letterMatchDictionary[letter.toLowerCase()] === 'match-partial') {
      return 'bg-yellow-400 text-white';
    }
    if (letterMatchDictionary[letter.toLowerCase()] === 'match-none') {
      return 'bg-gray-400 text-white';
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
    <div className="flex flex-col w-full max-w-[95%] sm:max-w-xl mx-auto gap-1">
      <div className="flex gap-1">
        {KEYS_1ST_ROW.map((key: string, index: number) => (
          <button
            key={index}
            className={`${addClass(
              key
            )} flex-1 flex justify-center items-center py-2 sm:px-px box-border uppercase font-semibold text-lg sm:text-xl text-gray-800 bg-gray-100 border border-neutral-300 cursor-pointer`}
            onClick={() => onLetterEnter(key)}
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
            )} flex-1 flex justify-center items-center py-2 sm:px-px box-border uppercase font-semibold text-lg sm:text-xl text-gray-800 bg-gray-100 border border-neutral-300 cursor-pointer`}
            onClick={() => onLetterEnter(key)}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="flex gap-1">
        <button
          className="flex-1 flex justify-center items-center py-2 sm:px-px box-border uppercase font-semibold text-lg sm:text-xl text-gray-800 bg-gray-100 border border-neutral-300 cursor-pointer"
          onClick={onWordEnter}
        >
          <AiOutlineEnter />
        </button>
        {KEYS_3RD_ROW.map((key: string, index: number) => (
          <button
            key={index}
            className={`${addClass(
              key
            )} flex-1 flex justify-center items-center py-2 sm:px-px box-border uppercase font-semibold text-lg sm:text-xl text-gray-800 bg-gray-100 border border-neutral-300 cursor-pointer`}
            onClick={() => onLetterEnter(key)}
          >
            {key}
          </button>
        ))}
        <button
          className="flex-1 flex justify-center items-center py-2 sm:px-px box-border uppercase font-semibold text-lg sm:text-xl text-gray-800 bg-gray-100 border border-neutral-300 cursor-pointer"
          onClick={onLetterRemove}
        >
          <FaDeleteLeft />
        </button>
      </div>
    </div>
  );
}

export default Keyboard;
