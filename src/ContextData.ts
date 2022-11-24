import { createContext } from 'react';
import { PlayerType } from './view/App';
export interface DataContextType {
	myUuid: string;
	setMyUuid: (newUuid: string) => void;
	userName: string;
	setUserName: (name: string) => void;
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
}

export const DataContext = createContext<DataContextType>({
	myUuid: '',
	setMyUuid: () => {},
	userName: '',
	setUserName: () => {},
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
});
