import { useEffect, useContext, useState } from 'react';
import { DataContext } from '../../../ContextData';
import { Grid, Paper, Typography, ImageList, ImageListItem, LinearProgress } from '@mui/material';
import Base from '../../../components/base';
import { HeaderText } from '../../../components/Typography';

export default function TalkAGuessReversed() {
	const { amIChooser, imageUrls, onVote, setGameState, players, me } = useContext(DataContext);
	const [timer, setTimer] = useState(100);
	const [images, setImages] = useState([...imageUrls].sort(() => Math.random() - 0.5));
	const [Phase, setPhase] = useState(0);
	const [chosenImage, setChosenImage] = useState('');

	useEffect(() => {
		let interval: NodeJS.Timer;
		setTimeout(() => {
			setPhase(1);
			interval = setInterval(() => {
				setTimer((timer) => timer - 0.1);
			}, 10);
		}, 2000);
		return () => clearInterval(interval);
	}, []);
	if (amIChooser) {
		if (timer <= 0 || me?.lastOption !== -1) setGameState('results');
	}
	if (!amIChooser) {
		if (Phase === 0)
			return (
				<Base title='Game'>
					<img
						id='mainPicture'
						src={imageUrls[0]}
						style={{ maxWidth: '50%', maxHeight: '50%', display: 'block', margin: '2em auto' }}
						alt=''
					/>
				</Base>
			);
		return (
			<Base title='Game'>
				<HeaderText text='Describe the picture' />
				<LinearProgress
					variant='determinate'
					value={timer}
				/>
			</Base>
		);
	}

	if (Phase === 0) {
		return (
			<Base title='Game'>
				<HeaderText text='Prepare for pictures' />
			</Base>
		);
	}

	return (
		<Base title='Game'>
			{chosenImage ? (
				<HeaderText text='You have already chosen.' />
			) : (
				<ImageList
					variant='masonry'
					cols={2}
					gap={1}
					sx={{ width: '80vw' }}
				>
					{images.map((url) => (
						<ImageListItem
							key={url}
							onClick={() => {
								setChosenImage(url);
								onVote(imageUrls.indexOf(url), timer);
							}}
						>
							<img
								src={url}
								alt=''
							/>
						</ImageListItem>
					))}
				</ImageList>
			)}
			<LinearProgress
				variant='determinate'
				value={timer}
			/>
		</Base>
	);
}
