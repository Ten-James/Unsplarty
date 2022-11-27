import { useState, useEffect } from 'react';
import Base from '../components/base';
import { Button, Stack, Paper, List, ListItemText, TextField, ButtonGroup } from '@mui/material';
import { HeaderText, PlainText } from '../components/Typography';
import { writeAllTemplatesToFirebase, writeAllThemesToFirebase, howManyICanFetch } from '../handlers/fetcherHandlers';
import { storeGetCollection, storeGetDocument, storeRead, storeWrite } from '../firebase/firestore';
import { useDatabase } from '../hooks/useDatabase';
import { Link } from 'react-router-dom';
import { User } from 'firebase/auth';
import { resetLobby } from '../handlers';

export interface statusType {
  count: number;
  total: number;
  status: string;
}

export interface ThemesDocumentType {
  themes: string[];
  newThemes: string[];
}

interface FetcherProps {
  user: User;
}
const Fetcher = ({ user }: FetcherProps) => {
  const [lastTime, setLastTime] = useDatabase<string>('lastTimeIFetched', '');
  const [lastCount, setLastCount] = useDatabase<number>('lastCountIFetched', 0);
  const [status, setStatus] = useState<statusType>({ count: 0, total: 50, status: 'Fetch' });

  const [themes, setThemes] = useState<ThemesDocumentType>({ themes: [], newThemes: [] });
  const [validEmails, setValidEmails] = useState<string[]>([]);
  const [newTheme, setNewTheme] = useState<string>('');

  useEffect(() => {
    storeRead(storeGetDocument('default', 'themes')).then(data => {
      if (data.exists()) setThemes(data.data() as ThemesDocumentType);
    });
    storeRead(storeGetDocument('default', 'users')).then(data => {
      if (data.exists()) setValidEmails(data.data()?.accepted as string[]);
    });
  }, []);

  if (!validEmails.includes(user.email || '')) {
    return (
      <Base title="Admin Panel">
        <PlainText text="You are not allowed to use this page" />
        <Button href="\" fullWidth variant="contained">
          To lobby
        </Button>
      </Base>
    );
  }

  return (
    <Base title="Admin Panel" noPaper>
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={4}>
        <Stack spacing={4}>
          <Paper elevation={3} style={{ padding: '3rem' }}>
            <HeaderText text={`Logged as ${user.email}`} />
            <Stack direction="row" justifyContent="center" alignItems="center">
              <ButtonGroup variant="contained">
                <Button onClick={() => resetLobby({}, false)}>Reset Game</Button>
                <Button href="\">To lobby</Button>
              </ButtonGroup>
            </Stack>
          </Paper>
          <Paper elevation={3} style={{ padding: '3rem' }}>
            <Stack spacing={2}>
              <HeaderText text={`Last time fetched: ${new Date(lastTime).toLocaleString().split(':')[0]}h`} />
              {howManyICanFetch(lastTime, lastCount) ? <HeaderText text={`You can fetch now ${howManyICanFetch(lastTime, lastCount)}`} /> : null}
              <Button variant="contained" disabled={howManyICanFetch(lastTime, lastCount)===0} onClick={() => writeAllTemplatesToFirebase(true, setStatus, lastTime, setLastTime, lastCount, setLastCount)}>
                Fetch new
              </Button>
              <Button variant="contained" disabled={howManyICanFetch(lastTime, lastCount)===0} onClick={() => writeAllTemplatesToFirebase(false, setStatus, lastTime, setLastTime, lastCount, setLastCount)}>
                Fetch
              </Button>
              <HeaderText sx={{ TextAlign: 'left' }} text={`${status.count}/${status.total}: ${status.status}`} />
              <Button variant="contained" onClick={() => writeAllThemesToFirebase(setThemes)}>
                Rewrite Themes
              </Button>
            </Stack>
          </Paper>
        </Stack>
        <Paper elevation={3} style={{ padding: '3rem' }}>
          <Stack spacing={2}>
            <HeaderText margin="0" text={`Themes`} />
            <Stack direction={'row'} spacing={6}>
              <Stack spacing={1}>
                <HeaderText margin="0" text={`in use: ${themes.themes.length}`} />
                {themes.themes ? (
                  <List sx={{ maxHeight: 360, overflow: 'auto' }}>
                    {themes.themes.map((theme, index) => (
                      <ListItemText key={index} primary={theme} />
                    ))}
                  </List>
                ) : null}
              </Stack>
              <Stack spacing={1}>
                <HeaderText margin="0" text={`new: ${themes.newThemes.length}`} />
                {themes.newThemes ? (
                  <List sx={{ maxHeight: 360, overflow: 'auto' }}>
                    {themes.newThemes.map((theme, index) => (
                      <ListItemText key={index} primary={theme} />
                    ))}
                  </List>
                ) : null}
              </Stack>
            </Stack>
            <Stack sx={{ mt: '1rem' }} direction="column" justifyContent="center" alignItems="center" spacing={1}>
              <TextField
                id="standard-basic"
                label="New Theme"
                value={newTheme}
                onChange={e => setNewTheme(e.target.value)}
                // @ts-ignore
                onSubmit={() => setThemes(old => ({ themes: old.themes, newThemes: [...old.newThemes, newTheme] } as ThemesDocumentType))}
                fullWidth
                variant="outlined"
              />
              <Button fullWidth variant="contained" onClick={() => setThemes(old => ({ themes: old.themes, newThemes: [...old.newThemes, newTheme] } as ThemesDocumentType))}>
                Add theme
              </Button>
            </Stack>
            <Button fullWidth variant="contained" onClick={() => storeWrite(storeGetDocument('default', 'themes'), themes)}>
              Save To database
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Base>
  );
};
export default Fetcher;
