import { Typography } from '@mui/material';

interface PlainTextProps {
	text: string;
	margin?: string;
}

export const HeaderText = ({ text, margin }: PlainTextProps) => {
	return (
		<Typography
			variant='h5'
			component='div'
			margin={margin || '1rem'}
		>
			{text}
		</Typography>
	);
};

export const PlainText = ({ text, margin }: PlainTextProps) => {
	return (
		<Typography
			variant='body1'
			component='div'
			margin={margin || '1rem'}
		>
			{text}
		</Typography>
	);
};
