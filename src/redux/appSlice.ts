import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState } from '../types';
import words from '../dict.json';

export type InitialState = {
  gameState: GameState;
};

const initialState: InitialState = {
  gameState: {
    enteredWords: [],
    currentWord: '',
    targetWord: words[Math.floor(Math.random() * words.length)],
  },
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setCurrentWord: (state, action: PayloadAction<string>) => {
      state.gameState.currentWord =
        state.gameState.currentWord + action.payload;
    },
    removeLastLetterInCurrentWord: (state) => {
      state.gameState.currentWord = state.gameState.currentWord.slice(0, -1);
    },
    resetGame: (state) => {
      state.gameState = {
        enteredWords: [],
        currentWord: '',
        targetWord: words[Math.floor(Math.random() * words.length)],
      };
    },
    addWordToEnteredWords: (state, action: PayloadAction<string>) => {
      state.gameState.enteredWords.push(action.payload);
      state.gameState.currentWord = '';
    },
  },
});

export default appSlice.reducer;
export const {
  setCurrentWord,
  removeLastLetterInCurrentWord,
  resetGame,
  addWordToEnteredWords,
} = appSlice.actions;
