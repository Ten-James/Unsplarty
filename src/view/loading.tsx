import Navigation from '../components/Navigation';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import { useEffect, useState } from 'react';

const quotes: string[] = ["Yea I'm loading", 'Loading is fun', "You know that it's loading", "Loading is not a bug, it's a feature", 'James is loading', 'Loading is lie', 'Loading is life', 'Loading is love'];

export default function Loading() {
	const [visibleQuote, setVisibleQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);
	useEffect(() => {
		const interval = setInterval(() => {
			const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
			const length = visibleQuote.length;
			const length2 = newQuote.length;
			const interval2 = setInterval(() => {
				setVisibleQuote((x) => x.slice(0, x.length - 1));
			}, 20);
			setTimeout(() => {
				clearInterval(interval2);
			}, length * 20);
			setTimeout(() => {
				const interval3 = setInterval(() => {
					setVisibleQuote((x) => x + newQuote[x.length]);
				}, 20);
				setTimeout(() => {
					setVisibleQuote(newQuote);
					clearInterval(interval3);
				}, length2 * 20);
			}, length * 20);
		}, 8000);
		return () => clearInterval(interval);
	}, []);
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
					{/* <CircularProgress /> */}
					<Box
						bgcolor={(th) => th.palette.primary.main}
						className='load load1'
					></Box>
					<Box
						bgcolor={(th) => th.palette.primary.main}
						className='load load2'
					></Box>
					<Box
						bgcolor={(th) => th.palette.primary.main}
						className='load load3'
					></Box>
					<Box
						bgcolor={(th) => th.palette.primary.main}
						className='load load4'
					></Box>
					<Typography
						variant='h3'
						color='primary'
						className='load5'
					>
						{visibleQuote}
					</Typography>
				</Grid>
			</Grid>
		</>
	);
}
