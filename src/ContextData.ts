import { createContext } from 'react';
export interface DataContextType {
	myIndex: number;
	userName: string;
	setUserName: (name: string) => void;
	gameState: string;
	setGameState: (state: string) => void;
	currentGame: string;
	setCurrentGame: (game: string) => void;
	players: string[];
	setPlayers: (players: string[]) => void;
	imageUrls: string[];
	setImage: (url: string) => void;
	setFakeImage: (urls: string[]) => void;
	amIMaster: boolean;
	amIChooser: boolean;
	onVote: (vote: number, timer: number) => void;
	playerOpinions: number[];
	playerScores: number[];
	playerStreaks: number[];
	nextPlayer: () => void;
	theme: boolean;
	changeTheme: (dark: boolean) => void;
}

export const DataContext = createContext<DataContextType>({
	myIndex: 0,
	userName: '',
	setUserName: () => {},
	gameState: '',
	setGameState: () => {},
	currentGame: '',
	setCurrentGame: () => {},
	players: [],
	setPlayers: () => {},
	imageUrls: [],
	setImage: () => {},
	setFakeImage: () => {},
	amIMaster: false,
	amIChooser: false,
	onVote: () => {},
	playerOpinions: [],
	playerScores: [],
	playerStreaks: [],
	nextPlayer: () => {},
	theme: true,
	changeTheme: () => {},
});
