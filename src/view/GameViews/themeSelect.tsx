import { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../ContextData';
import { Button, ButtonGroup, Stack } from '@mui/material';
import Base from '../../components/base';
import { HeaderText } from '../../components/Typography';
import { Handler } from '../../handlers';

export default function ThemeSelect() {
  const { setImage, setGameState, setFakeImage, amIChooser, players, get3Themes, get4Images } = useContext(DataContext);
  const [themes, setThemes] = useState<string[]>(get3Themes());

  useEffect(() => {
    if (amIChooser) {
      setImage('');
      setFakeImage([]);
    }
  }, []);

  return (
    <Base title="Theme Select">
      {amIChooser ? (
        <>
          <HeaderText margin="0" text="Select your theme" />
          <Stack sx={{ mt: '1rem' }} direction="row" alignItems="center" justifyContent="center">
            <ButtonGroup variant="contained" aria-label="outlined button group">
              {themes &&
                themes.map(theme => (
                  <Button key={theme} onClick={() => Handler(theme, players, setGameState, setImage, setFakeImage, get4Images)}>
                    {theme}
                  </Button>
                ))}
            </ButtonGroup>
          </Stack>
        </>
      ) : (
        <HeaderText text="Please wait till chooser choose" />
      )}
    </Base>
  );
}
