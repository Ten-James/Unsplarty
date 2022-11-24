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

export interface PlayerType {
	name: string;
	lastOption: number;
	score: number;
	streak: number;
}
const App = () => {
	const [currentPlayer, setCurrentPlayer] = useDatabase<number>('currentPlayer', 0);
	const [playerOrder, setPlayerOrder] = useDatabase<string[]>('playerOrder', []);

	const [gameState, setGameState] = useDatabase<string>('gameState', '');
	const [players, setPlayers] = useDatabase<{ [key: string]: PlayerType }>('players', {});
	const [currentGame, setCurrentGame] = useDatabase('talking', '');
	const [master, setMaster] = useDatabase('master', '');

	const [image, setImage] = useDatabase<string>('image', '');
	const [fakeImage, setFakeImage] = useDatabase<string[]>('fakeImage', []);
	const [darkTheme, setDarkTheme] = useState(true);
	const [myUuid, setMyUuid] = useState<string>('');

	const [userName, setUserName] = useState('');

	const amIMaster = master === myUuid;

	if (userName === '' && !['lobby', ''].includes(gameState)) {
		return (
			<div className='App'>
				<h1>You are late ask them to reset game</h1>
			</div>
		);
	}

	const ContextData: DataContextType = {
		myUuid,
		setMyUuid,
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
		amIChooser: playerOrder !== null && playerOrder[currentPlayer] === myUuid,
		onVote: (vote, timer) => {
			onPlayerVote(myUuid, players[myUuid], vote, timer);
		},
		nextPlayer: () => setCurrentPlayer((currentPlayer + 1) % playerOrder.length),
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
