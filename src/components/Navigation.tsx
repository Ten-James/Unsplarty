import { useContext } from 'react';
import { DataContext } from '../ContextData';
import AppBar from '@mui/material/AppBar';
import { Grid } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

interface Props {
	title: string;
}

export default function Navigation({ title }: Props) {
	const { amIMaster, me } = useContext(DataContext);
	return (
		<Grid
			item
			sx={{ flexGrow: 1 }}
		>
			<AppBar position='fixed'>
				<Toolbar>
					{me ? (
						<>
							<Typography
								variant='h6'
								component='div'
								sx={{ flexGrow: 1 }}
							>
								U {title}
							</Typography>

							<Typography
								variant='h6'
								component='div'
								sx={{ flexGrow: 1, textAlign: 'center', fontSize: '0.75em' }}
							>
								Score: {Math.floor(me.score)}
								<br></br> Streak: {me.streak}
							</Typography>
							<Typography
								variant='h6'
								component='div'
								sx={{ flexGrow: 1, textAlign: 'right' }}
							>
								{(amIMaster ? 'M:' : '') + me.name}
							</Typography>
						</>
					) : (
						<>
							<Typography
								variant='h6'
								component='div'
								align='center'
								sx={{ flexGrow: 1 }}
							>
								UNSPLARTY
							</Typography>
							<Typography
								variant='h6'
								component='div'
								align='center'
								sx={{ flexGrow: 1 }}
							>
								still in demo...
							</Typography>
						</>
					)}
				</Toolbar>
			</AppBar>
		</Grid>
	);
}
