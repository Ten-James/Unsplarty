import { useState, useEffect } from 'react';
import { useDatabase } from '../hooks/useDatabase';
import { onPlayerVote } from '../handlers';
import Lobby from './GameViews/lobby';
import Loading from './loading';
import GameSelect from './GameViews/gameSelect';
import ThemeSelect from './GameViews/themeSelect';
import Game from './GameViews/game';
import Result from './GameViews/result';
import { ThemeProvider } from '@mui/material';
import { darkThemeOption, lightThemeOption } from '../theme';
import { Box } from '@mui/material';

import { DataContext, DataContextType } from '../ContextData';

const App = () => {
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
	const [darkTheme, setDarkTheme] = useState(true);

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
		theme: darkTheme,
		changeTheme: (dark) => setDarkTheme(dark),
	};

	return (
		<ThemeProvider theme={darkTheme ? darkThemeOption : lightThemeOption}>
			<DataContext.Provider value={ContextData}>
				<Box
					bgcolor={(theme) => theme.palette.background.default}
					className='App'
				>
					{gameState === '' && <Loading />}
					{gameState === 'lobby' && <Lobby />}
					{gameState === 'gameSelect' && <GameSelect />}
					{gameState === 'choosing' && !playerOrder && <Loading />}
					{gameState === 'choosing' && playerOrder && <ThemeSelect />}
					{gameState === 'playing' && (!image || !fakeImage) && <Loading />}
					{gameState === 'playing' && image && fakeImage && <Game />}
					{gameState === 'results' && <Result />}
				</Box>
			</DataContext.Provider>
		</ThemeProvider>
	);
};

export default App;
