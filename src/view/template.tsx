import Navigation from '../components/Navigation';
import { Grid, Paper } from '@mui/material';

export default function temp() {
	return (
		<>
			<Navigation title='UnsPLARTY' />
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
						<div></div>
					</Paper>
				</Grid>
			</Grid>
		</>
	);
}
