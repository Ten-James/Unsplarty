import { Paper, SxProps, Theme } from '@mui/material';

interface PaperProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const BasePaper = ({ children, sx }: PaperProps) => (
  <Paper
    elevation={3}
    sx={sx || { padding: '3rem' }}
  >
    {children}
  </Paper>
);
