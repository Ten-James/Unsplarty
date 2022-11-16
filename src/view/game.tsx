import { useEffect, useContext } from 'react';
import { DataContext } from './App';
import Navigation from '../components/Navigation';
import { Grid, Paper, Typography } from '@mui/material';

export default function Game() {
	const { amIChooser, imageUrls } = useContext(DataContext);
	useEffect(() => {
		if (amIChooser) setTimeout(() => document.getElementById('mainPicture')?.remove(), 3000);

		return () => {};
	}, []);

	return (
		<>
			<Navigation title='Game' />
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
						<div>
							{amIChooser ? (
								<>
									<Typography
										variant='h4'
										align='center'
									>
										Describe this picture
									</Typography>
									<div>
										<img
											id='mainPicture'
											src={imageUrls[0]}
											style={{ maxWidth: '50%', maxHeight: '50%' }}
											alt='
                            '
										/>
									</div>
								</>
							) : (
								<>
									<Typography
										variant='h4'
										align='center'
									>
										Guess the correct image
									</Typography>
									<div>
										{imageUrls
											.sort(() => Math.random() - 0.5)
											.map((url) => (
												<img
													src={url}
													style={{ maxWidth: '30%', maxHeight: '50%' }}
													alt='
                            '
												/>
											))}
									</div>
								</>
							)}
						</div>
					</Paper>
				</Grid>
			</Grid>
		</>
	);
}
