import { TablePaginationActionsUnstyled } from '@mui/base';
import { FormEvent } from 'react';
import { write } from './firebase';
import { PlayerType } from './view/App';

const CreateUUID = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};

export const formSubmit = (event: FormEvent<HTMLFormElement>, players: { [key: string]: PlayerType }, newName: string, setMyUuid: (newUuid: string) => void) => {
	event.preventDefault();
	console.log(players, newName);
	if (!players) {
		const newUuid = CreateUUID();
		setMyUuid(newUuid);
		const newPlayer: PlayerType = { name: newName, lastOption: -1, score: 0, streak: 0 };
		write(`players/${newUuid}`, newPlayer);
		write('master', newUuid);
		return;
	}
	if (Object.values(players).find((player) => player.name === newName)) {
		alert('Name already taken');
		return;
	}
	const newUuid = CreateUUID();
	setMyUuid(newUuid);
	const newPlayer: PlayerType = { name: newName, lastOption: -1, score: 0, streak: 0 };
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

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
export const Handler = async (theme: string, players: { [key: string]: PlayerType }, setGameState: (state: string) => void, setImage: (url: string) => void, setFakeImage: (urls: string[]) => void) => {
	setGameState('playing');
	write('theme', theme);
	const res1 = await fetch('https://source.unsplash.com/random/?' + theme);
	await sleep(1000);
	let res2 = await fetch('https://source.unsplash.com/random/?' + theme);
	while (res1.url === res2.url) {
		await sleep(1000);
		res2 = await fetch('https://source.unsplash.com/random/?' + theme);
	}
	await sleep(1000);
	let res3 = await fetch('https://source.unsplash.com/random/?' + theme);
	while (res1.url === res3.url || res2.url === res3.url) {
		await sleep(1000);
		res3 = await fetch('https://source.unsplash.com/random/?' + theme);
	}
	await sleep(1000);
	let res4 = await fetch('https://source.unsplash.com/random/?' + theme);
	while (res1.url === res4.url || res2.url === res4.url || res3.url === res4.url) {
		await sleep(1000);
		res4 = await fetch('https://source.unsplash.com/random/?' + theme);
	}

	setImage(res1.url);
	setFakeImage([res2.url, res3.url, res4.url]);

	Object.keys(players).forEach((uuid) => {
		write(`players/${uuid}/lastOpinion`, -1);
	});
};
