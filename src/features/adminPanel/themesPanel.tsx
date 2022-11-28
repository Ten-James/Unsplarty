import { Button, List, ListItemText, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { useContext } from 'react';
import { AdminContext, ThemesDocumentType } from '.';
import { BasePaper } from '../../components/Paper';
import { VerticalStack } from '../../components/Stacks';
import { HeaderText } from '../../components/Typography';
import { storeGetDocument, storeWrite } from '../../firebase/firestore';

export const ThemesPanel = () => {
  const { themes, setThemes, newTheme, setNewTheme } = useContext(AdminContext);
  return (
    <BasePaper>
      <VerticalStack spc={2}>
        <HeaderText
          margin="0"
          text={`Themes`}
        />
        <Stack
          direction={'row'}
          spacing={6}
        >
          <Stack spacing={1}>
            <HeaderText
              margin="0"
              text={`in use: ${themes.themes.length}`}
            />
            {themes.themes ? (
              <List sx={{ maxHeight: 360, overflow: 'auto' }}>
                {themes.themes.map((theme, index) => (
                  <ListItemText
                    key={index}
                    primary={theme}
                  />
                ))}
              </List>
            ) : null}
          </Stack>
          <Stack spacing={1}>
            <HeaderText
              margin="0"
              text={`new: ${themes.newThemes.length}`}
            />
            {themes.newThemes ? (
              <List sx={{ maxHeight: 360, overflow: 'auto' }}>
                {themes.newThemes.map((theme, index) => (
                  <ListItemText
                    key={index}
                    primary={theme}
                  />
                ))}
              </List>
            ) : null}
          </Stack>
        </Stack>
        <TextField
          id="standard-basic"
          label="New Theme"
          value={newTheme}
          onChange={e => setNewTheme(e.target.value)}
          onSubmit={() => setThemes(old => ({ themes: old.themes, newThemes: [...old.newThemes, newTheme] } as ThemesDocumentType))}
          fullWidth
          variant="outlined"
        />
        <Button
          fullWidth
          variant="contained"
          onClick={() => setThemes(old => ({ themes: old.themes, newThemes: [...old.newThemes, newTheme] } as ThemesDocumentType))}
        >
          Add theme
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={() => storeWrite(storeGetDocument('default', 'themes'), themes)}
        >
          Save To database
        </Button>
      </VerticalStack>
    </BasePaper>
  );
};
