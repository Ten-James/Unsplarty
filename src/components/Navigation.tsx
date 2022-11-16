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
	const { amIMaster, userName } = useContext(DataContext);
	return (
		<Grid
			item
			sx={{ flexGrow: 1 }}
		>
			<AppBar position='static'>
				<Toolbar>
					<Typography
						variant='h6'
						component='div'
						sx={{ flexGrow: 1 }}
					>
						Unsplarty {title}
					</Typography>
					{amIMaster ? (
						<Typography
							variant='h6'
							component='div'
						>
							Master: {userName}
						</Typography>
					) : (
						<Typography
							variant='h6'
							component='div'
						>
							{userName}
						</Typography>
					)}
				</Toolbar>
			</AppBar>
		</Grid>
	);
}
