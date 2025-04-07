import { MatchLetterResult } from "../types";

export function matchLetterInWord(
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
