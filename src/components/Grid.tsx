import { GameState } from '../types';

/*
export interface GameState {
  enteredWords: string[];
  currentWord: string;
  guessWord: string;
}

*/

interface GridProps {
  gameState?: GameState;
}

// @TODO: необходимо отрисовать в сетке
// - ранее введенные слова
// - текущее вводимое слово

function Grid({ gameState }: GridProps) {
  const ROWS_COUNT = 6;
  const COLS_COUNT = 5;

  const { enteredWords } = gameState;

  return (
    <div
      className={`grid grid-cols-${COLS_COUNT} grid-rows-${ROWS_COUNT} gap-2`}
    >
      {enteredWords.map((enteredWord: string) =>
        enteredWord.split('').map(
          (letter, index: number) =>
            index < ROWS_COUNT - 1 && (
              <div
                className="cell border-solid border-2 border-black rounded-sm h-16"
                key={index}
              >
                {letter}
              </div>
            )
        )
      )}

      {ROWS_COUNT - enteredWords.length > 0 &&
        Array.from(
          { length: (ROWS_COUNT - enteredWords.length) * COLS_COUNT },
          (_, index) => (
            <div
              className="border-solid border-2 border-black rounded-sm h-16"
              key={index}
            ></div>
          )
        )}
    </div>
  );
}

export default Grid;
