import { useContext } from 'react';
import { DataContext } from './App';
import { write } from '../firebase';
import { formSubmit } from '../handlers';
import { Grid, Paper, Typography, List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import Navigation from '../components/Navigation';

const Lobby = () => {
	const { setGameState, players, userName, setUserName, amIMaster } = useContext(DataContext);

	return (
		<>
			<Navigation
				title='UnsPLARTY'
				name={userName}
			/>
			<Grid
				container
				spacing={2}
				justifyContent='center'
				alignItems='center'
			>
				<Grid item>
					<Paper
						elevation={3}
						style={{ padding: '2rem' }}
					>
						<Typography
							variant='h5'
							component='div'
							align='center'
						>
							PLAYERS
						</Typography>
						{players ? (
							<List>
								{players.map((player) => (
									<ListItem key={player}>
										<ListItemText primary={player} />
									</ListItem>
								))}
							</List>
						) : (
							<Typography
								variant='body1'
								component='div'
								margin='1rem'
							>
								No players yet
							</Typography>
						)}
						{players?.includes(userName) ? (
							<Typography
								variant='subtitle1'
								component='div'
							>
								Youre in the game!
							</Typography>
						) : (
							<Paper
								style={{ padding: '1rem' }}
								elevation={2}
							>
								<form onSubmit={(e) => formSubmit(e, players, userName)}>
									<Grid
										container
										direction='column'
										justifyContent='center'
										alignItems='center'
										spacing={2}
									>
										<Grid item>
											<TextField
												id='standard-basic'
												label='Username'
												onChange={(e) => setUserName(e.target.value)}
												variant='outlined'
											/>
										</Grid>
										<Grid item>
											<Button
												variant='outlined'
												type='submit'
											>
												Submit
											</Button>
										</Grid>
									</Grid>
								</form>
							</Paper>
						)}
						{amIMaster ? (
							<button onClick={() => setGameState('gameSelect')}>Start</button>
						) : (
							<Typography
								margin='1rem'
								variant='subtitle1'
								component='div'
								align='center'
							>
								Waiting for master to start
							</Typography>
						)}
					</Paper>
				</Grid>
			</Grid>
		</>
	);
};

export default Lobby;
