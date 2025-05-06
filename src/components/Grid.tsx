import { COLS_COUNT, ROWS_COUNT } from '../constants';
import { useAppSelector } from '../redux/store';
import { MatchLetterResult } from '../types';
import { matchLetterInWord } from '../utils/matchLetterInWord';

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

function Grid() {
  const gameState = useAppSelector((store) => store.appSlice.gameState);
  const enteredWords = gameState.enteredWords;
  const currentWord = gameState.currentWord;
  const targetWord = gameState.targetWord;

  const cols = Array.from({ length: COLS_COUNT });
  const emptyRows = Array.from({
    length: ROWS_COUNT - enteredWords.length - 1,
  });

  return (
    <div className="game-grid my-4 sm:my-8">
      <div className="flex flex-col items-center w-full gap-1 text-center">
        {enteredWords.map((enteredWord, wordIndex) => (
          <div
            className="flex justify-center w-full sm:max-w-lg gap-1"
            key={`entered-word-${wordIndex}`}
          >
            {enteredWord.split('').map((letter, index) => (
              <div
                className={`w-full max-w-[70px] border-2 p-1 sm:p-2 text-3xl sm:text-4xl uppercase shadow-sm rounded-sm text-shadow-sm font-medium ${createLetterClassName(
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
          <div
            className={`flex justify-center w-full sm:max-w-lg gap-1 ${
              gameState.isError ? 'wordСheckingError' : ''
            }`}
            key="current-word"
          >
            {cols.map((_, index) => (
              <div
                className={`w-full max-w-[70px] border-2 p-1 sm:p-2 text-3xl sm:text-4xl shadow-sm rounded-sm text-shadow-sm uppercase font-medium ${
                  currentWord[index]
                    ? ' border-black-300'
                    : 'border-neutral-300'
                }`}
                key={index}
              >
                <p>{currentWord[index] || '\u00A0'}</p>
              </div>
            ))}
          </div>
        )}

        {emptyRows.map((_, emptyIndex) => (
          <div
            className="flex justify-center w-full sm:max-w-lg gap-1"
            key={`empty-word-${emptyIndex}`}
          >
            {cols.map((_, index) => (
              <div
                className="w-full max-w-[70px] border-2 p-1 sm:p-2 text-3xl sm:text-4xl shadow-sm rounded-sm text-shadow-sm uppercase font-medium border-neutral-300"
                key={index}
              >
                <p>&nbsp;</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Grid;
