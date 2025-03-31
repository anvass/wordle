import { GameState } from '../types';

interface GridProps {
  gameState?: GameState;
}

function Grid({ gameState }: GridProps) {
  const ROWS_COUNT = 6;
  const COLS_COUNT = 5;

  const { enteredWords } = gameState;

  return (
    <div className="flex justify-center">
      <div
        className={`grid grid-cols-${COLS_COUNT} grid-rows-${ROWS_COUNT} gap-2 p-3 box-border w-full max-w-[500px]`}
      >
        {enteredWords.map((enteredWord: string) =>
          enteredWord.split('').map(
            (letter, index: number) =>
              index < ROWS_COUNT - 1 && (
                <div
                  className="border-2 px-1 py-2 text-center text-3xl sm:text-4xl uppercase font-bold border-neutral-300 rounded-sm"
                  key={index}
                >
                  <p>{letter}</p>
                </div>
              )
          )
        )}

        {ROWS_COUNT - enteredWords.length > 0 &&
          Array.from(
            { length: (ROWS_COUNT - enteredWords.length) * COLS_COUNT },
            (_, index) => (
              <div
                className="border-2 px-1 py-2 text-center text-3xl sm:text-4xl uppercase font-bold border-neutral-300 rounded-sm"
                key={index}
              ></div>
            )
          )}
      </div>
    </div>
  );
}

export default Grid;
