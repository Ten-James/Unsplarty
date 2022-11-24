import { useContext } from 'react';
import { DataContext } from '../view/App';
import AppBar from '@mui/material/AppBar';
import { Grid } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

interface Props {
	title: string;
}

export default function Navigation({ title }: Props) {
	const { amIMaster, userName, playerScores, playerStreaks, myIndex } = useContext(DataContext);
	return (
		<Grid
			item
			sx={{ flexGrow: 1 }}
		>
			<AppBar position='fixed'>
				<Toolbar>
					<Typography
						variant='h6'
						component='div'
						sx={{ flexGrow: 1 }}
					>
						U {title}
					</Typography>
					{playerScores && playerStreaks && (
						<Typography
							variant='h6'
							component='div'
							sx={{ flexGrow: 1, textAlign: 'center', fontSize: '0.75em' }}
						>
							Score: {Math.floor(playerScores[myIndex])}
							<br></br> Streak: {playerStreaks[myIndex]}
						</Typography>
					)}
					<Typography
						variant='h6'
						component='div'
						sx={{ flexGrow: 1, textAlign: 'right' }}
					>
						{(amIMaster ? 'M:' : '') + userName}
					</Typography>
				</Toolbar>
			</AppBar>
		</Grid>
	);
}
