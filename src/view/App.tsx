import { useState, useEffect, createContext } from 'react';
import { subscribe, write } from '../firebase';
import { useDatabase } from '../hooks/useDatabase';
import { onPlayerVote } from '../handlers';
import Lobby from './lobby';
import Loading from './loading';
import GameSelect from './gameSelect';
import ThemeSelect from './themeSelect';
import Game from './game';
import Result from './result';

interface DataContextType {
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
});

function App() {
	const [currentPlayer, setCurrentPlayer] = useDatabase<number>('currentPlayer', 0);
	const [playerOrder, setPlayerOrder] = useDatabase<string[]>('playerOrder', []);
	const [playerOpinions, setPlayerOpinions] = useDatabase<number[]>('playerOpinions', []);
	const [playerScores, setPlayerScores] = useDatabase<number[]>('playerScores', []);
	const [playerStreaks, setPlayerStreaks] = useDatabase<number[]>('playerStreaks', []);

	const [gameState, setGameState] = useDatabase<string>('gameState', '');
	const [players, setPlayers] = useDatabase<string[]>('players', []);
	const [currentGame, setCurrentGame] = useDatabase('talking', '');

	const [image, setImage] = useDatabase<string>('image', '');
	const [fakeImage, setFakeImage] = useDatabase<string[]>('fakeImage', []);

	const [userName, setUserName] = useState('');

	const amIMaster = players !== null && players[0] == userName;

	useEffect(() => {
		console.log(userName, players);
	}, [userName, players]);

	if (userName === '' && !['lobby', ''].includes(gameState)) {
		return (
			<div className='App'>
				<h1>You are late ask them to reset game</h1>
			</div>
		);
	}

	const ContextData: DataContextType = {
		myIndex: players !== null ? players.indexOf(userName) : -1,
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
		onVote: (vote, timer) => {
			onPlayerVote(players.indexOf(userName), vote, timer, playerScores, playerStreaks);
		},
		playerOpinions,
		playerScores,
		playerStreaks,
		nextPlayer: () => setCurrentPlayer((currentPlayer + 1) % players.length),
	};

	return (
		<DataContext.Provider value={ContextData}>
			<div className='App'>
				{gameState === '' && <Loading />}
				{gameState === 'lobby' && <Lobby />}
				{gameState === 'gameSelect' && <GameSelect />}
				{gameState === 'choosing' && !playerOrder && <Loading />}
				{gameState === 'choosing' && playerOrder && <ThemeSelect />}
				{gameState === 'playing' && (!image || !fakeImage) && <Loading />}
				{gameState === 'playing' && image && fakeImage && <Game />}
				{gameState === 'results' && <Result />}
			</div>
		</DataContext.Provider>
	);
}

export default App;
