import { COLS_COUNT, ROWS_COUNT } from '../constants';
import { GameState, MatchLetterResult } from '../types';
import { matchLetterInWord } from '../utils/matchLetterInWord';

interface GridProps {
  gameState: GameState;
}

const letterClassNames: Record<MatchLetterResult, string> = {
  'match-total': 'bg-green-500 text-white border-transparent',
  'match-partial': 'bg-yellow-400 text-white border-transparent',
  'match-none': 'bg-gray-500 text-white border-transparent',
};

function createLetterClassName(
  letterValue: string,
  letterIndex: number,
  word: string
): string {
  const match = matchLetterInWord(letterValue, letterIndex, word);

  return letterClassNames[match];
}

function Grid({ gameState }: GridProps) {
  const { enteredWords, currentWord, targetWord } = gameState;

  const cols = Array.from({ length: COLS_COUNT });
  const emptyRows = Array.from({
    length: ROWS_COUNT - enteredWords.length - 1,
  });

  return (
    <div className="flex flex-col justify-center items-center w-full gap-1 my-10">
      {enteredWords.map((enteredWord) => (
        <div className="flex w-full max-w-[95%] sm:max-w-lg gap-1">
          {enteredWord.split('').map((letter, index) => (
            <div
              className={`flex-1 border-2 p-2 text-center text-3xl sm:text-4xl uppercase font-semibold ${createLetterClassName(
                letter,
                index,
                targetWord
              )}`}
              key={index}
            >
              <p>{letter}</p>
            </div>
          ))}
        </div>
      ))}

      {enteredWords.length + 1 + emptyRows.length <= 6 && (
        <div className="flex w-full max-w-[95%] sm:max-w-lg gap-1">
          {cols.map((_, index) => (
            <div
              className="flex-1 border-2 p-2 text-center text-3xl sm:text-4xl uppercase font-bold border-neutral-300"
              key={index}
            >
              <p>{currentWord[index] || '\u00A0'}</p>
            </div>
          ))}
        </div>
      )}

      {emptyRows.map((_) => (
        <div className="flex w-full max-w-[95%] sm:max-w-lg gap-1">
          {cols.map((_, index) => (
            <div
              className="flex-1 border-2 p-2 text-center text-3xl sm:text-4xl uppercase font-bold border-neutral-300"
              key={index}
            >
              <p>&nbsp;</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;
