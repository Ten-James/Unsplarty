import { lazy, useContext, Suspense } from 'react';
import { DataContext } from '../../ContextData';
import Loading from '../loading';
import Games from './games';
import ImagesView from './imagesView';
import Lobby from './lobby';
const Reveal = lazy(() => import('./reveal'));
const GameSelect = lazy(() => import('./gameSelect'));
const ThemeSelect = lazy(() => import('./themeSelect'));
const Result = lazy(() => import('./result'));

interface GameViewsProps {
  areImagesLoaded: boolean;
}

const GameViews = ({ areImagesLoaded }: GameViewsProps) => {
  const { gameState, playerOrder, amIChooser, players, currentPlayerUUID } = useContext(DataContext);
  return (
    <>
      {gameState === '' && <Loading />}
      <Suspense fallback={<Loading />}>
        {gameState === 'lobby' && <Lobby />}
        {gameState === 'gameSelect' && <GameSelect />}
        {gameState === 'choosing' && !playerOrder && <Loading />}
        {gameState === 'choosing' && playerOrder && !amIChooser && <Loading reason={`${players[currentPlayerUUID].name} has to choose theme.`} />}
        {gameState === 'choosing' && playerOrder && amIChooser && <ThemeSelect />}
        {gameState === 'playing' && !areImagesLoaded && <Loading reason="Wait till images loads." />}
        {gameState === 'playing' && areImagesLoaded && <Games />}
        {gameState === 'reveal' && <Reveal />}
        {gameState === 'images' && <ImagesView />}
        {gameState === 'results' && <Result />}
      </Suspense>
    </>
  );
};

export default GameViews;
