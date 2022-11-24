import { Grid, Paper } from '@mui/material';
import Navigation from './Navigation';

interface BaseProps {
	title: string;
	children: React.ReactNode;
}

const Base = ({ title, children }: BaseProps) => {
	return (
		<>
			<Navigation title={title} />
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
						{children}
					</Paper>
				</Grid>
			</Grid>
		</>
	);
};

export default Base;
