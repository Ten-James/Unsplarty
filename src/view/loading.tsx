import Navigation from '../components/Navigation';
import { Grid, Typography, CircularProgress } from '@mui/material';
import { useContext } from 'react';
import { DataContext } from './App';
export default function Loading() {
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
					<CircularProgress />
				</Grid>
			</Grid>
		</>
	);
}
