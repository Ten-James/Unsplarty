import { write } from '../firebase';
import { useState } from 'react';
import Base from '../components/base';
import { Button, Stack } from '@mui/material';
import { HeaderText } from '../components/Typography';
import { writeAllTemplatesToFirebase, writeAllThemesToFirebase } from '../handlers';
import { useDatabase } from '../hooks/useDatabase';

const Fetcher = () => {
  const [lastTime, setLastTime] = useDatabase<string>('lastTimeIFetched', '');
  return (
    <Base title="Fetcher">
      <Stack spacing={2}>
        <HeaderText text={`Last time fetched: ${lastTime}`} />
        <Button variant="contained" onClick={() => writeAllTemplatesToFirebase(true, setLastTime)}>
          Fetch new
        </Button>
        <Button variant="contained" onClick={() => writeAllTemplatesToFirebase(false, setLastTime)}>
          Fetch
        </Button>
        <Button variant="contained" onClick={() => writeAllThemesToFirebase()}>
          Write to Firebase
        </Button>
      </Stack>
    </Base>
  );
};
export default Fetcher;
