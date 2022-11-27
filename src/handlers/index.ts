import { FormEvent } from 'react';
import { write } from '../firebase/realtime';
import { CreateUUID, getBase64FromUrl, setLocalName } from '../utils';
import { PlayerType } from '../view/App';

export const formSubmit = (event: FormEvent<HTMLFormElement>, players: { [key: string]: PlayerType }, newName: string, setMyUuid: (newUuid: string) => void) => {
  event.preventDefault();
  console.log(players, newName);
  if (!players) {
    const newUuid = CreateUUID();
    setMyUuid(newUuid);
    setLocalName(newName);
    const newPlayer: PlayerType = {
      name: newName,
      lastOpinion: -1,
      score: 0,
      streak: 0,
      loaded: false,
    };
    write(`players/${newUuid}`, newPlayer);
    write('master', newUuid);
    return;
  }
  if (Object.values(players).find(player => player.name === newName)) {
    alert('Name already taken');
    return;
  }
  const newUuid = CreateUUID();
  setMyUuid(newUuid);
  setLocalName(newName);
  const newPlayer: PlayerType = {
    name: newName,
    lastOpinion: -1,
    score: 0,
    streak: 0,
    loaded: false,
  };
  write(`players/${newUuid}`, newPlayer);
};

export const StartGame = (players: { [key: string]: PlayerType }) => {
  write('gameState', 'choosing');
  //random player order
  const playerOrder = Object.keys(players).sort(() => Math.random() - 0.5);
  write('playerOrder', playerOrder);
  write('currentPlayer', Math.floor(Math.random() * playerOrder.length));
  write('theme', '');
  write('image', '');
  write('fakeImage', []);
};

export const onPlayerVote = (uuid: string, player: PlayerType | undefined, vote: number, timer: number) => {
  if (!player) return;
  player = player as PlayerType;
  const Value = (timer * 10 + 100) * Math.pow(1.1, player.streak);
  write(`players/${uuid}/lastOpinion`, vote);
  if (vote === 0) {
    write(`players/${uuid}/score`, player.score + Value);
    if (timer !== 0) write(`players/${uuid}/streaks`, player.streak + 1);
  } else write(`players/${uuid}/streaks`, 0);
};

export const Handler = async (theme: string, players: { [key: string]: PlayerType }, setGameState: (state: string) => void, setImage: (url: string) => void, setFakeImage: (urls: string[]) => void, get4Images: (theme: string) => Promise<string[]>) => {
  setGameState('playing');
  write('theme', theme);
  const imageUrls = await get4Images(theme);
  const datas = await Promise.all(imageUrls.map(url => getBase64FromUrl(url)));
  setImage(datas[0]);
  setFakeImage([datas[1], datas[2], datas[3]]);
  write('requiredImages', 4);
};


export const newRound = (players: { [key: string]: PlayerType }, nextPlayer: () => void, setGameState: (str: string) => void) => {
  nextPlayer();
  setGameState('choosing');
  Object.keys(players).forEach(uuid => {
    write(`players/${uuid}/lastOpinion`, -1);
    write(`players/${uuid}/loaded`, false);
  });
};
