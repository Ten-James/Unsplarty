import { useState, useEffect } from 'react';
import { useDatabase } from '../hooks/useDatabase';
import { onPlayerVote } from '../handlers';
import { Box } from '@mui/material';

import { DataContext, DataContextType } from '../ContextData';
import { Route, Routes } from 'react-router-dom';
import Admin from './admin';
import GameViews from './GameViews';
import { write } from '../firebase';
import { getLocalName } from '../utils';

export interface PlayerType {
	name: string;
	lastOption: number;
	score: number;
	streak: number;
	loaded: boolean;
}

interface AppProps {
	darkTheme: boolean;
	setDarkTheme: (darkTheme: boolean) => void;
}
const App = ({ darkTheme, setDarkTheme }: AppProps) => {
	const [currentPlayer, setCurrentPlayer] = useDatabase<number>('currentPlayer', 0);
	const [playerOrder, setPlayerOrder] = useDatabase<string[]>('playerOrder', []);

	const [gameState, setGameState] = useDatabase<string>('gameState', '');
	const [players, setPlayers] = useDatabase<{ [key: string]: PlayerType }>('players', {});
	const [currentGame, setCurrentGame] = useDatabase('talking', '');
	const [master, setMaster] = useDatabase('master', '');

	const [image, setImage] = useDatabase<string>('image', '');
	const [requiredImages, setRequiredImages] = useDatabase<number>('requiredImages', 0);
	const [fakeImage, setFakeImage] = useDatabase<string[]>('fakeImage', []);
	const [myUuid, setMyUuid] = useState<string>('');

	const [userName, setUserName] = useState(getLocalName());

	const amIMaster = master === myUuid;

	if (userName === '' && !['lobby', ''].includes(gameState)) {
		return (
			<div className='App'>
				<h1>You are late ask them to reset game</h1>
			</div>
		);
	}

	useEffect(() => {
		if (image !== '') {
			if (fakeImage !== null && fakeImage.length === requiredImages - 1) {
				write('players/' + myUuid + '/loaded', true);
			}
		}
	}, [image, fakeImage, requiredImages]);

	const ContextData: DataContextType = {
		myUuid,
		me: players ? players[myUuid] : undefined,
		setMyUuid,
		userName,
		setUserName,
		playerOrder,
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
		<DataContext.Provider value={ContextData}>
			<Box
				bgcolor={(theme) => theme.palette.background.default}
				className='App'
			>
				<Routes>
					<Route
						path='/admin'
						element={<Admin />}
					/>
					<Route
						path='/'
						element={<GameViews areImagesLoaded={players && Object.values(players).every((p) => p.loaded)} />}
					/>
				</Routes>
			</Box>
		</DataContext.Provider>
	);
};

export default App;
