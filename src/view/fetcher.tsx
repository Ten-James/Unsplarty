import { useState, useEffect } from 'react';
import Base from '../components/base';
import { Button, ButtonGroup } from '@mui/material';
import { HeaderText, PlainText } from '../components/Typography';
import { storeGetDocument, storeRead } from '../firebase/firestore';
import { useDatabase } from '../hooks/useDatabase';
import { User } from 'firebase/auth';
import { resetLobby } from '../handlers';
import { HorizontalStack, HorizontalStackBreakpoint, VerticalStack } from '../components/Stacks';
import { BasePaper } from '../components/Paper';
import { StatusType, ThemesDocumentType, AdminContext, FetchPanel, ThemesPanel } from '../features/adminPanel';

interface FetcherProps {
  user: User;
}
const Fetcher = ({ user }: FetcherProps) => {
  const [lastTime, setLastTime] = useDatabase<string>('lastTimeIFetched', '');
  const [lastCount, setLastCount] = useDatabase<number>('lastCountIFetched', 0);
  const [status, setStatus] = useState<StatusType>({ count: 0, total: 50, status: 'Fetch' });

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
        <Button
          href="\"
          fullWidth
          variant="contained"
        >
          To lobby
        </Button>
      </Base>
    );
  }

  return (
    <AdminContext.Provider value={{ lastTime, setLastTime, lastCount, setLastCount, status, setStatus, themes, setThemes, newTheme, setNewTheme }}>
      <Base
        title="Admin Panel"
        noPaper
      >
        <HorizontalStackBreakpoint
          ai="stretch"
          spc={2}
        >
          <VerticalStack
            ai="stretch"
            jc="center"
            spc={4}
          >
            <BasePaper>
              <HeaderText text={`Logged as ${user.email}`} />
              <HorizontalStack
                jc="stretch"
                spc={2}
              >
                <Button
                  variant="contained"
                  sx={{ flexGrow: 1 }}
                  onClick={() => resetLobby({}, false)}
                >
                  Reset Game
                </Button>
                <Button
                  variant="contained"
                  sx={{ flexGrow: 1 }}
                  href="\"
                >
                  To lobby
                </Button>
              </HorizontalStack>
            </BasePaper>
            <FetchPanel />
          </VerticalStack>
          <ThemesPanel />
        </HorizontalStackBreakpoint>
      </Base>
    </AdminContext.Provider>
  );
};
export default Fetcher;
