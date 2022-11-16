import { useState, useEffect, createContext } from 'react';
import { subscribe, write } from '../firebase';
import { useDatabase } from '../hooks/useDatabase';
import Lobby from './lobby';
import Loading from './loading';
import GameSelect from './gameSelect';
import ThemeSelect from './themeSelect';
import Game from './game';

interface DataContextType {
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
}

export const DataContext = createContext<DataContextType>({
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
});

function App() {
	const [currentPlayer, setCurrentPlayer] = useDatabase<number>('currentPlayer', 0);
	const [playerOrder, setPlayerOrder] = useDatabase<string[]>('playerOrder', []);

	const [gameState, setGameState] = useDatabase<string>('gameState', 'lobby');
	const [players, setPlayers] = useDatabase<string[]>('players', []);
	const [currentGame, setCurrentGame] = useDatabase('talking', '');

	const [image, setImage] = useDatabase<string>('image', '');
	const [fakeImage, setFakeImage] = useDatabase<string[]>('fakeImage', []);

	const [userName, setUserName] = useState('');

	const amIMaster = players !== null && players[0] === userName;

	if (userName === '' && gameState !== 'lobby') {
		return (
			<div className='App'>
				<h1>You are late ask them to reset game</h1>
			</div>
		);
	}

	const ContextData: DataContextType = {
		userName,
		setUserName,
		gameState,
		setGameState,
		currentGame,
		setCurrentGame,
		players,
		setPlayers,
		imageUrls: fakeImage ? [image, ...fakeImage] : [image],
		setImage,
		setFakeImage,
		amIMaster,
		amIChooser: playerOrder !== null && playerOrder[currentPlayer] === userName,
	};

	return (
		<DataContext.Provider value={ContextData}>
			<div className='App'>
				{gameState === 'lobby' && <Lobby />}
				{gameState === 'gameSelect' && <GameSelect />}
				{gameState === 'choosing' && !playerOrder && <Loading />}
				{gameState === 'choosing' && playerOrder && <ThemeSelect />}
				{gameState === 'playing' && (!image || !fakeImage) && <Loading />}
				{gameState === 'playing' && image && fakeImage && <Game />}
			</div>
		</DataContext.Provider>
	);
}

export default App;
