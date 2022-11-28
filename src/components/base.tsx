import { Grid, Paper } from '@mui/material';
import Navigation from './Navigation';

interface BaseProps {
  title: string;
  children: React.ReactNode;
  noPaper?: boolean;
}

const Base = ({ title, children, noPaper }: BaseProps) => {
  return (
    <>
      <Navigation title={title} />
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          {noPaper ? (
            children
          ) : (
            <Paper
              elevation={3}
              style={{ padding: '2rem' }}
            >
              {children}
            </Paper>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Base;
