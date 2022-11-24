import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import Base from '../components/base';
import { DataContext } from './App';

interface PlayerViewType {
	name: string;
	score: number;
	playerOpinion: number;
}

const Result = () => {
	const { players, playerScores, playerOpinions, amIMaster, setGameState, nextPlayer } = useContext(DataContext);
	const [PlayerView, setPlayerView] = useState<PlayerViewType[]>([]);
	useEffect(() => {
		if (players && playerScores) {
			const tempPlayerView: PlayerViewType[] = [];
			[...players].forEach((player, index) => {
				tempPlayerView.push({
					name: player,
					score: Math.floor(playerScores[index]),
					playerOpinion: playerOpinions[index],
				});
			});
			setPlayerView(tempPlayerView.sort((a, b) => b.score - a.score));
		}
	}, [players, playerScores]);

	return (
		<Base title='Results'>
			<List>
				{PlayerView.map((player) => (
					<ListItem key={player.name}>
						<ListItemText primary={`${player.name} ${player.score}`} />
					</ListItem>
				))}
			</List>
			{amIMaster ? (
				<Button
					fullWidth
					variant='outlined'
					onClick={() => {
						nextPlayer();
						setGameState('choosing');
					}}
				>
					Start
				</Button>
			) : players ? (
				<Typography
					margin='1rem'
					variant='subtitle1'
					component='div'
					align='center'
				>
					Waiting for master to start
				</Typography>
			) : null}
		</Base>
	);
};

export default Result;
