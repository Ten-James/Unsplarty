import { useContext, useMemo } from 'react';
import { Button, Tooltip } from '@mui/material';
import { BasePaper } from '../../components/Paper';
import { HorizontalStack, VerticalStack } from '../../components/Stacks';
import { HeaderText } from '../../components/Typography';
import { howManyICanFetch, removeDuplicatesInFirebase, writeAllTemplatesToFirebase, writeAllThemesToFirebase } from '../../handlers/fetcherHandlers';
import { AdminContext } from '.';

export const FetchPanel = () => {
  const { lastTime, lastCount, setLastTime, setLastCount, setStatus, status, setThemes } = useContext(AdminContext);
  const currentFetchAvailable = useMemo(() => howManyICanFetch(lastTime, lastCount), [lastTime, lastCount]);
  return (
    <BasePaper>
      <VerticalStack spc={2}>
        <HeaderText text={`Last time fetched: ${new Date(lastTime).toLocaleString().split(':')[0]}h`} />
        {currentFetchAvailable ? <HeaderText text={`You can fetch now ${currentFetchAvailable}`} /> : null}
        <HorizontalStack
          jc="stretch"
          sx={{ width: '80%' }}
          spc={2}
        >
          <Tooltip title="Fetch only new themes from unsplash">
            <Button
              variant="contained"
              sx={{ flexGrow: 1 }}
              disabled={currentFetchAvailable === 0}
              onClick={() => writeAllTemplatesToFirebase(true, setStatus, lastTime, setLastTime, lastCount, setLastCount)}
            >
              Fetch new
            </Button>
          </Tooltip>
          <Tooltip title="Fetch all themes from unsplash">
            <Button
              variant="contained"
              sx={{ flexGrow: 1 }}
              disabled={currentFetchAvailable === 0}
              onClick={() => writeAllTemplatesToFirebase(false, setStatus, lastTime, setLastTime, lastCount, setLastCount)}
            >
              Fetch
            </Button>
          </Tooltip>
        </HorizontalStack>
        <HeaderText
          sx={{ TextAlign: 'left' }}
          text={`${status.count}/${status.total}: ${status.status}`}
        />

        <Tooltip title="It just write themes to one file so in game it can be referenced. Force James to do it automatically">
          <Button
            variant="contained"
            fullWidth
            onClick={() => writeAllThemesToFirebase(setThemes)}
          >
            Rewrite Themes
          </Button>
        </Tooltip>
        <Tooltip title="It removes images with same urls, this might take a while ">
          <Button
            variant="contained"
            fullWidth
            onClick={() => removeDuplicatesInFirebase(setStatus)}
          >
            Remove duplicates
          </Button>
        </Tooltip>
      </VerticalStack>
    </BasePaper>
  );
};
