export type GameScreen = 'title' | 'flight';
export interface GameState { screen: GameScreen; paused: boolean; }
export function createInitialState(): GameState { return { screen: 'title', paused: false }; }
export function beginVoyage(state: GameState): GameState { return { ...state, screen: 'flight', paused: false }; }
