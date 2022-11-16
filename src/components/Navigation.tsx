import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

interface Props {
	title: string;
	name: string;
}

export default function Navigation({ title }: Props) {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					<Typography
						variant='h6'
						component='div'
						sx={{ flexGrow: 1 }}
					>
						{title}
					</Typography>
					<Typography
						variant='h6'
						component='div'
					>
						{name}
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
