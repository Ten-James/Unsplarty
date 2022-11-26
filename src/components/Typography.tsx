import { Typography } from '@mui/material';

interface PlainTextProps {
  text: string;
  margin?: string;
  sx?: any;
}

export const HeaderText = ({ text, margin, sx }: PlainTextProps) => {
  return (
    <Typography variant="h5" component="div" margin={margin || '1rem'} sx={sx || { textAlign: 'center' }}>
      {text}
    </Typography>
  );
};

export const PlainText = ({ text, margin, sx }: PlainTextProps) => {
  return (
    <Typography variant="body1" component="div" margin={margin || '1rem'} sx={sx || { textAlign: 'center' }}>
      {text}
    </Typography>
  );
};
