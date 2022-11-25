import { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../ContextData';
import { Button, ButtonGroup } from '@mui/material';
import Base from '../../components/base';
import { HeaderText } from '../../components/Typography';
import { Handler } from '../../handlers';
import { get3Themes } from '../../utils';

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
