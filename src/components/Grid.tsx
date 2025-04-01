import { GameState } from '../types';

interface GridProps {
  gameState?: GameState;
}

type MatchLetterResult = 'match-total' | 'match-partial' | 'match-none';

function Grid({ gameState }: GridProps) {
  const ROWS_COUNT = 6;
  const COLS_COUNT = 5;

  const { enteredWords, currentWord, targetWord } = gameState;

  function matchLetterInWord(
    letterValue: string,
    letterIndex: number,
    word: string
  ): MatchLetterResult {
    if (word[letterIndex] === letterValue) {
      return 'match-total';
    }

    if (word.includes(letterValue)) {
      return 'match-partial';
    }

    return 'match-none';
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

  return (
    <div className="flex justify-center w-full">
      <div
        className={`grid grid-cols-${COLS_COUNT} grid-rows-${ROWS_COUNT} gap-2 w-full max-w-[95%] sm:max-w-xl`}
      >
        {enteredWords.length > 0 &&
          enteredWords.map((enteredWord: string) =>
            enteredWord.split('').map(
              (letter, index: number) =>
                index < COLS_COUNT && (
                  <div
                    className={`border-2 px-1 py-2 text-center text-3xl sm:text-4xl uppercase font-bold rounded-sm ${createLetterClassName(
                      letter,
                      index,
                      targetWord
                    )}`}
                    key={index}
                  >
                    <p>{letter}</p>
                  </div>
                )
            )
          )}

        {currentWord.length > 0 &&
          currentWord.split('').map(
            (letter: string, index: number) =>
              index < COLS_COUNT && (
                <div
                  className="border-2 px-1 py-2 text-center text-3xl sm:text-4xl uppercase font-bold border-neutral-300 rounded-sm"
                  key={index}
                >
                  <p>{letter}</p>
                </div>
              )
          )}

        {currentWord.length > 0 &&
          currentWord.length < COLS_COUNT &&
          Array.from(
            { length: COLS_COUNT - currentWord.length },
            (_, index) => (
              <div
                className="border-2 px-1 py-2 text-center text-3xl sm:text-4xl uppercase font-bold border-neutral-300 rounded-sm"
                key={index}
              >
                <p>&nbsp;</p>
              </div>
            )
          )}

        {currentWord.length == 0 &&
          Array.from({ length: COLS_COUNT }, (_, index) => (
            <div
              className="border-2 px-1 py-2 text-center text-3xl sm:text-4xl uppercase font-bold border-neutral-300 rounded-sm"
              key={index}
            >
              <p>&nbsp;</p>
            </div>
          ))}

        {ROWS_COUNT - enteredWords.length - 1 > 0 &&
          Array.from(
            { length: (ROWS_COUNT - enteredWords.length - 1) * COLS_COUNT },
            (_, index) => (
              <div
                className="border-2 px-1 py-2 text-center text-3xl sm:text-4xl uppercase font-bold border-neutral-300 rounded-sm"
                key={index}
              >
                <p>&nbsp;</p>
              </div>
            )
          )}
      </div>
    </div>
  );
}

export default Grid;
