import { useContext } from 'react';
import { DataContext } from './App';
import { formSubmit } from '../handlers';
import { Grid, Paper, Typography, List, ListItem, ListItemText, TextField, Button, FormControlLabel, Stack } from '@mui/material';
import Base from '../components/base';
import { MaterialUISwitch } from '../components/muiSwitch';

const Lobby = () => {
	const { setGameState, players, userName, setUserName, amIMaster, changeTheme } = useContext(DataContext);

	return (
		<Base title='Lobby'>
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
					align='center'
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
									value={userName}
									onChange={(e) => setUserName(e.target.value)}
									onSubmit={(e) => e.form.submit()}
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
				<Button
					fullWidth
					variant='outlined'
					onClick={() => setGameState('gameSelect')}
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
			<Stack
				direction='row'
				justifyContent='center'
				alignItems='center'
				spacing={2}
			>
				<FormControlLabel
					control={
						<MaterialUISwitch
							sx={{ m: 1 }}
							onChange={(e) => changeTheme(e.target.checked)}
						/>
					}
					label='Theme'
				/>
			</Stack>
		</Base>
	);
};

export default Lobby;
