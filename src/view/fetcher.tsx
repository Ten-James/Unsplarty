import { useState } from 'react';
import Base from '../components/base';
import { Button, Stack } from '@mui/material';
import { HeaderText } from '../components/Typography';
import { writeAllTemplatesToFirebase, writeAllThemesToFirebase } from '../handlers/fetcherHandlers';
import { useDatabase } from '../hooks/useDatabase';

export interface statusType {
  count: number;
  total: number;
  status: string;
}

const Fetcher = () => {
  const [lastTime, setLastTime] = useDatabase<string>('lastTimeIFetched', '');
  const [status, setStatus] = useState<statusType>({ count: 0, total: 50, status: 'Fetch' });
  return (
    <Base title="Fetcher">
      <Stack spacing={2}>
        <HeaderText text={`Last time fetched: ${lastTime}`} />
        <Button variant="contained" onClick={() => writeAllTemplatesToFirebase(true, setStatus, setLastTime)}>
          Fetch new
        </Button>
        <Button variant="contained" onClick={() => writeAllTemplatesToFirebase(false, setStatus, setLastTime)}>
          Fetch
        </Button>
        <HeaderText sx={{ TextAlign: 'left' }} text={`${status.count}/${status.total}: ${status.status}`} />
        <Button variant="contained" onClick={() => writeAllThemesToFirebase()}>
          Write to Firebase
        </Button>
      </Stack>
    </Base>
  );
};
export default Fetcher;
