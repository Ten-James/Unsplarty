import { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../ContextData';
import { Grid, Paper, Typography, Button, ButtonGroup } from '@mui/material';
import Base from '../../components/base';
import { HeaderText } from '../../components/plaingText';
import { Handler } from '../../handlers';
const get3Themes = () => {
	// find api for that
	const themes = ['Civilization', 'Studio', 'Garden', 'Animal', 'Vegetable', 'Mineral', 'Fruit', 'Vehicle', 'Weapon', 'Furniture', 'Clothing', 'Food', 'Flower', 'Tree', 'Bird', 'Fish', 'Buildings', 'Sports'];

	return [themes[Math.floor(Math.random() * themes.length)], themes[Math.floor(Math.random() * themes.length)], themes[Math.floor(Math.random() * themes.length)]];
};

export default function ThemeSelect() {
	const { setImage, setGameState, setFakeImage, amIChooser, players } = useContext(DataContext);
	const [themes, setThemes] = useState<string[]>(get3Themes());

	useEffect(() => {
		if (amIChooser) {
			setImage('');
			setFakeImage([]);
		}
	}, []);

	return (
		<Base title='Theme Select'>
			{amIChooser ? (
				<>
					<HeaderText text='Select your theme' />
					<ButtonGroup
						variant='outlined'
						aria-label='outlined button group'
					>
						{themes && themes.map((theme) => <Button onClick={() => Handler(theme, players, setGameState, setImage, setFakeImage)}>{theme}</Button>)}
					</ButtonGroup>
				</>
			) : (
				<HeaderText text='Please wait till chooser choose' />
			)}
		</Base>
	);
}
