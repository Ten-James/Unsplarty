import { createContext } from 'react';
import { PlayerType } from './view/App';
export interface DataContextType {
  myUuid: string;
  setMyUuid: (newUuid: string) => void;
  me: PlayerType | undefined;
  userName: string;
  setUserName: (name: string) => void;
  playerOrder: string[];
  currentPlayerUUID: string;
  gameState: string;
  setGameState: (state: string) => void;
  currentGame: string;
  setCurrentGame: (game: string) => void;
  players: { [key: string]: PlayerType };
  setPlayers: (players: { [key: string]: PlayerType }) => void;
  imageUrls: string[];
  setImage: (url: string) => void;
  setFakeImage: (urls: string[]) => void;
  amIMaster: boolean;
  amIChooser: boolean;
  onVote: (vote: number, timer: number) => void;
  nextPlayer: () => void;
  theme: boolean;
  changeTheme: (dark: boolean) => void;
  get3Themes: () => string[];
  get4Images: (theme: string) => Promise<string[]>;
  timer: number;
  currentTheme: string;
  setDoesTimerStarted: (start: boolean) => void;
}

export const DataContext = createContext<DataContextType>({
  myUuid: '',
  setMyUuid: () => {},
  me: { name: '', lastOpinion: -1, score: 0, streak: 0, loaded: false, addedScore: 0 },
  userName: '',
  setUserName: () => {},
  playerOrder: [],
  currentPlayerUUID: '',
  gameState: '',
  setGameState: () => {},
  currentGame: '',
  setCurrentGame: () => {},
  players: {},
  setPlayers: () => {},
  imageUrls: [],
  setImage: () => {},
  setFakeImage: () => {},
  amIMaster: false,
  amIChooser: false,
  onVote: () => {},
  nextPlayer: () => {},
  theme: true,
  changeTheme: () => {},
  get3Themes: () => [],
  get4Images: async () => [],
  timer: 0,
  currentTheme: '',
  setDoesTimerStarted: () => {},
});
