import { useState, useEffect, lazy } from 'react';
import { useDatabase } from '../hooks/useDatabase';
import { onPlayerVote } from '../handlers';

import { DataContext, DataContextType } from '../ContextData';
import GameViews from './GameViews';
import { write } from '../firebase';
import { getLocalName } from '../utils';
import { useThemes } from '../hooks/useThemes';

export interface PlayerType {
  name: string;
  lastOpinion: number;
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
  const [currentGame, setCurrentGame] = useDatabase('currentGame', '');
  const [master, setMaster] = useDatabase('master', '');

  const [image, setImage] = useDatabase<string>('image', '');
  const [requiredImages, setRequiredImages] = useDatabase<number>('requiredImages', 0);
  const [fakeImage, setFakeImage] = useDatabase<string[]>('fakeImage', []);
  const [myUuid, setMyUuid] = useState<string>('');
  const [get3Themes, get4Images] = useThemes();

  const [userName, setUserName] = useState(getLocalName());

  const amIMaster = master === myUuid;

  if (myUuid === '' && !['lobby', ''].includes(gameState)) {
    return (
      <div className="App">
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
    currentPlayerUUID: playerOrder ? playerOrder[currentPlayer] : '',
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
    changeTheme: dark => setDarkTheme(dark),
    get3Themes,
    get4Images,
  };

  return (
    <DataContext.Provider value={ContextData}>
      <GameViews areImagesLoaded={players && Object.values(players).every(p => p.name !== undefined && p.loaded)} />
    </DataContext.Provider>
  );
};

export default App;
