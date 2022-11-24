import { useContext } from 'react';
import { DataContext } from './App';
import { StartGame } from '../handlers';
import { Grid, Paper, Button, ButtonGroup, Typography } from '@mui/material';
import Navigation from '../components/Navigation';
import { Container } from '@mui/system';
import Base from '../components/base';

const GAMEMODES = ['talk&guess', 'reverse'];

export default function GameSelect() {
	const { currentGame, setCurrentGame, amIMaster, players, userName } = useContext(DataContext);
	return (
		<Base title='Game Select'>
			<Typography
				component='div'
				variant='h5'
			>
				Current Game: {currentGame}
			</Typography>
			<Grid
				container
				justifyContent='center'
				alignItems='center'
				sx={{ margin: '2em 0' }}
			>
				<ButtonGroup variant='outlined'>
					{GAMEMODES.map((game) => (
						<Button
							key={game}
							disabled={!amIMaster}
							color='info'
							variant={currentGame === game ? 'contained' : 'outlined'}
							onClick={() => setCurrentGame(game)}
						>
							{game}
						</Button>
					))}
				</ButtonGroup>
			</Grid>
			<Grid
				container
				justifyContent='center'
				alignItems='center'
				sx={{ padding: '0.3em' }}
			>
				<Button
					variant='outlined'
					disabled={!amIMaster}
					onClick={() => StartGame(players)}
				>
					Start
				</Button>
			</Grid>
		</Base>
	);
}
