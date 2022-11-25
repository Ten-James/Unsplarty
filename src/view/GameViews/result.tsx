import { Button, LinearProgress, List, ListItem, ListItemText, Paper, Typography, useTheme } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Base from '../../components/base';
import { PlainText } from '../../components/Typography';
import { DataContext } from '../../ContextData';
import { write } from '../../firebase';
import { newRound } from '../../handlers';

interface PlayerViewType {
	name: string;
	score: number;
	playerOpinion: number;
}

const Result = () => {
	const { players, amIMaster, setGameState, nextPlayer } = useContext(DataContext);

	return (
		<Base title='Results'>
			{Object.values(players)
				.sort((a, b) => b.score - a.score)
				.map((player) => (
					<React.Fragment key={player.name}>
						<PlainText text={`${player.name} has ${Math.floor(player.score)} Points.`} />
						<LinearProgress
							variant='determinate'
							value={Math.min(Math.floor(player.score) / 100, 100)}
						/>
					</React.Fragment>
				))}
			{amIMaster ? (
				<Button
					fullWidth
					sx={{ marginTop: '1rem' }}
					variant='outlined'
					onClick={() => newRound(players, nextPlayer, setGameState)}
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
