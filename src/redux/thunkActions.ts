import { createAsyncThunk } from '@reduxjs/toolkit';
import { GameState } from '../types';

const validateWord = createAsyncThunk(
  'game/validateWord',
  async (state: GameState) => {
    const { enteredWords, currentWord } = state;

    if (enteredWords.includes(currentWord)) {
      throw new Error('Invalid word');
    }
    return currentWord;
  }
);

export { validateWord };
