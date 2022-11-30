import { useState, useEffect, lazy } from 'react';
import { useDatabase } from '../hooks/useDatabase';
import { onPlayerVote } from '../handlers';

import { DataContext, DataContextType } from '../ContextData';
import GameViews from './GameViews';
import { write } from '../firebase/realtime';
import { getLocalName } from '../utils';
import { useThemes } from '../hooks/useThemes';
import Base from '../components/base';
import { HeaderText, PlainText } from '../components/Typography';

export interface PlayerType {
  name: string;
  lastOpinion: number;
  score: number;
  addedScore: number;
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
  const [currentTheme, setCurrentTheme] = useDatabase('theme', '');
  const [master, setMaster] = useDatabase('master', '');

  const [image, setImage] = useDatabase<string>('image', '');
  const [requiredImages, setRequiredImages] = useDatabase<number>('requiredImages', 0);
  const [fakeImage, setFakeImage] = useDatabase<string[]>('fakeImage', []);
  const [whenRoundStart, setWhenRoundStart] = useDatabase<number>('whenRoundStart', 0);
  const [doesTimerStarted, setDoesTimerStarted] = useDatabase('doesTimerStarted', false);

  const [timer, setTimer] = useState(0);
  const [myUuid, setMyUuid] = useState<string>('');
  const [get3Themes, get4Images] = useThemes();

  const [userName, setUserName] = useState(getLocalName());

  const amIMaster = master === myUuid;

  useEffect(() => {
    if (image !== '') {
      if (fakeImage !== null && fakeImage.length === requiredImages - 1) {
        write('players/' + myUuid + '/loaded', true);
      }
    }
  }, [image, fakeImage, requiredImages]);

  useEffect(() => {
    if (amIMaster)
      if (players !== null && !doesTimerStarted)
        if (Object.values(players).every(p => p.name !== undefined && p.loaded)) if (whenRoundStart < new Date().getTime()) setWhenRoundStart(new Date().getTime() + 5000);
  }, [players]);

  useEffect(() => {
    if (whenRoundStart > 0) {
      if (whenRoundStart > new Date().getTime()) {
        setDoesTimerStarted(true);
        setTimer(Math.floor((whenRoundStart - new Date().getTime()) / 10));
        const interval = setInterval(() => {
          setTimer(old => old - 1);
        }, 10);
        return () => clearInterval(interval);
      }
    }
  }, [whenRoundStart]);

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
      onPlayerVote(myUuid, players[myUuid], vote, timer, whenRoundStart);
    },
    nextPlayer: () => setCurrentPlayer((currentPlayer + 1) % playerOrder.length),
    theme: darkTheme,
    changeTheme: dark => setDarkTheme(dark),
    get3Themes,
    get4Images,
    timer,
    currentTheme,
    setDoesTimerStarted,
  };
  if (myUuid === '' && !['lobby', ''].includes(gameState)) {
    return (
      <Base title="fuck">
        <HeaderText text="They are already playing" />
        <PlainText text="Ask them to start new game" />
      </Base>
    );
  }
  return (
    <DataContext.Provider value={ContextData}>
      <GameViews areImagesLoaded={players && Object.values(players).every(p => p.name !== undefined && p.loaded)} />
    </DataContext.Provider>
  );
};

export default App;
