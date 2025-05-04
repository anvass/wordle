import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState, ModalName } from '../types';
import words from '../dict.json';
import { COLS_COUNT, ROWS_COUNT } from '../constants';

export type InitialState = {
  gameState: GameState;
  modalName: ModalName | null;
};

const initialState: InitialState = {
  gameState: {
    isFinished: false,
    enteredWords: [],
    currentWord: '',
    targetWord: words[Math.floor(Math.random() * words.length)],
    isError: false,
  },
  modalName: 'help',
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    removeLetter: (state) => {
      if (state.gameState.currentWord.length > 0) {
        state.gameState.currentWord = state.gameState.currentWord.slice(0, -1);
      }
    },

    resetGame: (state) => {
      state.gameState = {
        isFinished: false,
        enteredWords: [],
        currentWord: '',
        targetWord: words[Math.floor(Math.random() * words.length)],
        isError: false,
      };
      state.modalName = null;
    },

    setModalName: (state, action: PayloadAction<ModalName | null>) => {
      state.modalName = action.payload;
    },

    enterLetter: (state, action: PayloadAction<string>) => {
      if (state.gameState.isFinished) {
        state.modalName = 'reset';
      }

      if (
        !state.gameState.isFinished &&
        state.gameState.currentWord.length < COLS_COUNT
      ) {
        state.gameState.currentWord =
          state.gameState.currentWord + action.payload;
      }
    },

    enterWord: (state) => {
      const currentWord = state.gameState.currentWord.toLowerCase();
      const targetWord = state.gameState.targetWord.toLowerCase();

      if (
        currentWord.length !== COLS_COUNT ||
        state.gameState.enteredWords.length === ROWS_COUNT
      ) {
        return;
      }

      if (currentWord === targetWord) {
        state.gameState.enteredWords.push(currentWord);
        state.gameState.currentWord = '';
        state.gameState.isFinished = true;
        state.modalName = 'success';
        return;
      }

      if (state.gameState.enteredWords.length <= ROWS_COUNT) {
        state.gameState.enteredWords.push(currentWord);
        state.gameState.currentWord = '';

        if (state.gameState.enteredWords.length === ROWS_COUNT) {
          state.gameState.isFinished = true;
          state.modalName = 'failed';
          return;
        }
      }
    },
  },
});

export default appSlice.reducer;
export const { removeLetter, resetGame, setModalName, enterLetter, enterWord } =
  appSlice.actions;
