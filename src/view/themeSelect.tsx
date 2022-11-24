import { useState, useContext, useEffect } from 'react';
import { DataContext } from './App';
import { write } from '../firebase';
import Navigation from '../components/Navigation';
import { Grid, Paper, Typography, Button, ButtonGroup } from '@mui/material';
import Base from '../components/base';
const get3Themes = () => {
	// find api for that
	const themes = ['Civilization', 'Studio', 'Garden', 'Animal', 'Vegetable', 'Mineral', 'Fruit', 'Vehicle', 'Weapon', 'Furniture', 'Clothing', 'Food', 'Flower', 'Tree', 'Bird', 'Fish', 'Buildings', 'Sports'];

	return [themes[Math.floor(Math.random() * themes.length)], themes[Math.floor(Math.random() * themes.length)], themes[Math.floor(Math.random() * themes.length)]];
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function ThemeSelect() {
	const { setImage, setGameState, setFakeImage, amIChooser, players } = useContext(DataContext);
	const [themes, setThemes] = useState<string[]>(get3Themes());

	const Handler = async (theme: string) => {
		setGameState('playing');
		write('theme', theme);
		const res1 = await fetch('https://source.unsplash.com/random/?' + theme);
		await sleep(1000);
		let res2 = await fetch('https://source.unsplash.com/random/?' + theme);
		while (res1.url === res2.url) {
			await sleep(1000);
			res2 = await fetch('https://source.unsplash.com/random/?' + theme);
		}
		await sleep(1000);
		let res3 = await fetch('https://source.unsplash.com/random/?' + theme);
		while (res1.url === res3.url || res2.url === res3.url) {
			await sleep(1000);
			res3 = await fetch('https://source.unsplash.com/random/?' + theme);
		}
		await sleep(1000);
		let res4 = await fetch('https://source.unsplash.com/random/?' + theme);
		while (res1.url === res4.url || res2.url === res4.url || res3.url === res4.url) {
			await sleep(1000);
			res4 = await fetch('https://source.unsplash.com/random/?' + theme);
		}

		setImage(res1.url);
		setFakeImage([res2.url, res3.url, res4.url]);
		write('playerOpinions', new Array(players.length).fill(-1));
	};

	useEffect(() => {
		if (amIChooser) {
			setImage('');
			setFakeImage([]);
		}
	}, []);

	return (
		<Base title='Theme Select'>
			<div>
				{amIChooser ? (
					<>
						<Typography
							variant='h5'
							component='div'
							align='center'
							marginBottom='1rem'
						>
							Select a theme
						</Typography>
						<ButtonGroup
							variant='outlined'
							aria-label='outlined button group'
						>
							{themes && themes.map((theme) => <Button onClick={() => Handler(theme)}>{theme}</Button>)}
						</ButtonGroup>
					</>
				) : (
					<Typography
						variant='h5'
						component='div'
						align='center'
						marginBottom='1rem'
					>
						Waiting for chooser to choose
					</Typography>
				)}
			</div>
		</Base>
	);
}
