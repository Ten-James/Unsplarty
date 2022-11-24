import { TablePaginationActionsUnstyled } from '@mui/base';
import { FormEvent } from 'react';
import { write } from './firebase';

export const formSubmit = (event: FormEvent<HTMLFormElement>, players: string[], newName: string) => {
	event.preventDefault();
	console.log(players, newName);
	if (!players) {
		write('players', [newName]);
		return;
	}
	if (players?.includes(newName)) {
		alert('Name already taken');
		return;
	}
	const newPlayers = [...players, newName];
	write('players', newPlayers);
};

export const StartGame = (players: string[]) => {
	write('gameState', 'choosing');
	//random player order
	const playerOrder = players.sort(() => Math.random() - 0.5);
	write('playerOrder', playerOrder);
	write('currentPlayer', Math.floor(Math.random() * players.length));
	write('theme', '');
	write('image', '');
	write('fakeImage', []);
	write('playerOpinions', new Array(players.length).fill(-1));
	write('playerScores', new Array(players.length).fill(0));
	write('playerStreaks', new Array(players.length).fill(0));
};

export const onPlayerVote = (playerIndex: number, urlIndex: number, timer: number, playerScores: number[], playerStreaks: number[]) => {
	const Value = (timer * 10 + 100) * Math.pow(1.1, playerStreaks[playerIndex]);
	write(`playerOpinions/${playerIndex}`, urlIndex);
	if (urlIndex === 0) {
		write(`playerScores/${playerIndex}`, playerScores[playerIndex] + Value);
		if (timer !== 0) write(`playerStreaks/${playerIndex}`, playerStreaks[playerIndex] + 1);
	} else write(`playerStreaks/${playerIndex}`, 0);
};
