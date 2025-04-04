export interface GameState {
  enteredWords: string[];
  currentWord: string;
  targetWord: string;
}

export interface LetterState {
  index: number;
  letter: string;
  status: 'dafault' | 'absent' | 'in-place' | 'not-in-place';
}
