import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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

export const setError = createAsyncThunk(
  'app/setError',
  async (_, { dispatch }) => {
    dispatch(appSlice.actions.setErrorState(true));
    await new Promise((resolve) => setTimeout(resolve, 400));
    dispatch(appSlice.actions.setErrorState(false));
  }
);

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
          state.gameState.currentWord + action.payload.toLowerCase();
      }
    },

    setErrorState: (state, action: PayloadAction<boolean>) => {
      state.gameState.isError = action.payload;
    },

    enterWord: (state) => {
      const currentWord = state.gameState.currentWord;
      const targetWord = state.gameState.targetWord;

      if (
        currentWord.length !== COLS_COUNT ||
        state.gameState.enteredWords.length === ROWS_COUNT
      ) {
        return;
      }

      // if (
      //   state.gameState.enteredWords.includes(currentWord) ||
      //   !words.includes(currentWord)
      // ) {
      //   console.log('test');
      //   return;
      // }

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
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(setError.pending, (state) => {})
  //     .addCase(setError.fulfilled, (state) => {})
  //     .addCase(setError.rejected, (state, action) => {});
  // },
});

export default appSlice.reducer;
export const { removeLetter, resetGame, setModalName, enterLetter, enterWord } =
  appSlice.actions;
