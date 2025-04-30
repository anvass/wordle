export interface GameState {
  isFinished: boolean;
  enteredWords: string[];
  currentWord: string;
  targetWord: string;
}

export interface LetterState {
  index: number;
  letter: string;
  status: 'dafault' | 'absent' | 'in-place' | 'not-in-place';
}

export type MatchLetterResult = 'match-total' | 'match-partial' | 'match-none';

export type ModalName = 'help' | 'success' | 'failed' | 'config';
