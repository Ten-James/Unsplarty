import { useContext, useMemo } from 'react';
import { Button } from '@mui/material';
import { BasePaper } from '../../components/Paper';
import { HorizontalStackStrech, VerticalStack } from '../../components/Stacks';
import { HeaderText } from '../../components/Typography';
import { howManyICanFetch, writeAllTemplatesToFirebase, writeAllThemesToFirebase } from '../../handlers/fetcherHandlers';
import { AdminContext } from '.';

export const FetchPanel = () => {
  const { lastTime, lastCount, setLastTime, setLastCount, setStatus, status, setThemes } = useContext(AdminContext);
  const currentFetchAviable = useMemo(() => howManyICanFetch(lastTime, lastCount), [lastTime, lastCount]);
  return (
    <BasePaper>
      <VerticalStack spc={2}>
        <HeaderText text={`Last time fetched: ${new Date(lastTime).toLocaleString().split(':')[0]}h`} />
        {currentFetchAviable ? <HeaderText text={`You can fetch now ${currentFetchAviable}`} /> : null}
        <HorizontalStackStrech
          sx={{ width: '80%' }}
          spc={2}
        >
          <Button
            variant="contained"
            sx={{ flexGrow: 1 }}
            disabled={currentFetchAviable === 0}
            onClick={() => writeAllTemplatesToFirebase(true, setStatus, lastTime, setLastTime, lastCount, setLastCount)}
          >
            Fetch new
          </Button>
          <Button
            variant="contained"
            sx={{ flexGrow: 1 }}
            disabled={currentFetchAviable === 0}
            onClick={() => writeAllTemplatesToFirebase(false, setStatus, lastTime, setLastTime, lastCount, setLastCount)}
          >
            Fetch
          </Button>
        </HorizontalStackStrech>
        <HeaderText
          sx={{ TextAlign: 'left' }}
          text={`${status.count}/${status.total}: ${status.status}`}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={() => writeAllThemesToFirebase(setThemes)}
        >
          Rewrite Themes
        </Button>
      </VerticalStack>
    </BasePaper>
  );
};
