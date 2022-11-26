import { write } from '../firebase';
import { useState } from 'react';
import Base from '../components/base';
import { Button } from '@mui/material';
import { HeaderText } from '../components/Typography';
import { writeAllTemplatesToFirebase, writeAllThemesToFirebase } from '../handlers';

const Fetcher = () => {
  return (
    <Base title="Fetcher">
      <Button variant="contained" onClick={() => writeAllTemplatesToFirebase()}>
        Fetch
      </Button>
      <Button variant="contained" onClick={() => writeAllThemesToFirebase()}>
        Write to Firebase
      </Button>
    </Base>
  );
};
export default Fetcher;
