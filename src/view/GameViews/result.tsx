import { Button, List, ListItem, ListItemText, Typography, useTheme } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis, Tooltip } from 'recharts';
import Base from '../../components/base';
import { DataContext } from '../../ContextData';

interface PlayerViewType {
	name: string;
	score: number;
	playerOpinion: number;
}

const Result = () => {
	const { players, amIMaster, setGameState, nextPlayer } = useContext(DataContext);
	const theme = useTheme();

	return (
		<Base title='Results'>
			<BarChart
				width={730}
				height={250}
				data={Object.values(players)}
			>
				<CartesianGrid />
				<XAxis dataKey='name' />
				<YAxis />
				<Bar
					dataKey='score'
					maxBarSize={50}
					fill={theme.palette.primary.main}
				/>
			</BarChart>
			<List>
				{Object.values(players)
					.sort((a, b) => b.score - a.score)
					.map((player) => (
						<ListItem key={player.name}>
							<ListItemText primary={`${player.name} has ${Math.floor(player.score)} Points.`} />
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
