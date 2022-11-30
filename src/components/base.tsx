import { Grid, Paper } from '@mui/material';
import Navigation from './Navigation';

interface BaseProps {
  title: string;
  children: React.ReactNode;
  noPaper?: boolean;
  stretch?: boolean;
}

const Base = ({ title, children, ...args }: BaseProps) => {
  return (
    <>
      <Navigation title={title} />
      <Grid
        container
        marginTop={8}
        marginBottom={8}
        spacing={2}
        justifyContent={args.stretch ? 'stretch' : 'center'}
        alignItems={args.stretch ? 'stretch' : 'center'}
      >
        <Grid item>
          {args.noPaper ? (
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
