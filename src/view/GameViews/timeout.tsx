import Navigation from '../../components/Navigation';
import { Grid, Typography, Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../ContextData';

export default function Timeout() {
  const { timer } = useContext(DataContext);
  return (
    <>
      <Navigation title="Loading" />
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid container item spacing={2} justifyContent="center" alignItems="center" direction="column">
          <Box bgcolor={th => th.palette.primary.main} className="load load1"></Box>
          <Box bgcolor={th => th.palette.primary.main} className="load load2"></Box>
          <Box bgcolor={th => th.palette.primary.main} className="load load3"></Box>
          <Box bgcolor={th => th.palette.primary.main} className="load load4"></Box>
          <Typography variant="h1" color="primary" className="load5">
            {Math.floor(timer / 100)}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
