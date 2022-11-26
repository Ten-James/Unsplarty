import { lazy, useContext, Suspense } from 'react';
import { DataContext } from '../../ContextData';
import Loading from '../loading';
import Games from './games';
import Lobby from './lobby';
const Reveal = lazy(() => import('./reveal'));
const GameSelect = lazy(() => import('./gameSelect'));
const ThemeSelect = lazy(() => import('./themeSelect'));
const Result = lazy(() => import('./result'));

interface GameViewsProps {
	areImagesLoaded: boolean;
}

const GameViews = ({ areImagesLoaded }: GameViewsProps) => {
	const { gameState, playerOrder } = useContext(DataContext);
	return (
		<>
			{gameState === '' && <Loading />}
			<Suspense fallback={<Loading />}>
				{gameState === 'lobby' && <Lobby />}
				{gameState === 'gameSelect' && <GameSelect />}
				{gameState === 'choosing' && !playerOrder && <Loading />}
				{gameState === 'choosing' && playerOrder && <ThemeSelect />}
				{gameState === 'playing' && !areImagesLoaded && <Loading />}
				{gameState === 'playing' && areImagesLoaded && <Games />}
				{gameState === 'reveal' && <Reveal />}
				{gameState === 'results' && <Result />}
			</Suspense>
		</>
	);
};

export default GameViews;
