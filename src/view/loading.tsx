import Navigation from '../components/Navigation';
import { Grid, Typography, CircularProgress } from '@mui/material';
import { useContext } from 'react';
import { DataContext } from './App';
export default function Loading() {
	const { userName } = useContext(DataContext);
	return (
		<>
			<Navigation title='Loading' />
			<Grid
				container
				spacing={2}
				justifyContent='center'
				alignItems='center'
			>
				<Grid
					container
					item
					spacing={2}
					justifyContent='center'
					alignItems='center'
					direction='column'
				>
					<Typography
						variant='h5'
						component='div'
						align='center'
						marginBottom='1rem'
					>
						Loading...
					</Typography>
					<CircularProgress />
				</Grid>
			</Grid>
		</>
	);
}
