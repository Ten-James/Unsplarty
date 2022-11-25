import { useContext } from 'react';
import { DataContext } from '../../ContextData';
import { formSubmit } from '../../handlers';
import { Paper, List, ListItem, ListItemText, TextField, Button, FormControlLabel, Stack } from '@mui/material';
import Base from '../../components/base';
import { MaterialUISwitch } from '../../components/muiSwitch';
import { HeaderText, PlainText } from '../../components/Typography';

const Lobby = () => {
	const { setGameState, players, userName, setUserName, amIMaster, changeTheme, theme, setMyUuid, me } = useContext(DataContext);

	return (
		<Base title='Lobby'>
			<HeaderText text='Players' />
			{players ? (
				<List>
					{Object.values(players).map((player) => (
						<ListItem key={player.name}>
							<ListItemText primary={player.name} />
						</ListItem>
					))}
				</List>
			) : (
				<PlainText text='No players yet' />
			)}
			{me ? (
				<PlainText text='Youre in the game!' />
			) : (
				<Paper
					style={{ padding: '1rem' }}
					elevation={2}
				>
					<form onSubmit={(e) => formSubmit(e, players, userName, setMyUuid)}>
						<Stack
							direction='column'
							justifyContent='center'
							alignItems='center'
							spacing={2}
						>
							<TextField
								id='standard-basic'
								label='Username'
								value={userName}
								onChange={(e) => setUserName(e.target.value)}
								// @ts-ignore
								onSubmit={(e) => e.form.submit()}
								variant='outlined'
							/>
							<Button
								variant='outlined'
								type='submit'
							>
								Submit
							</Button>
						</Stack>
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
				<PlainText text={me ? 'Waiting for master to start' : 'Hurry till master starts game.'} />
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
							checked={theme}
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
