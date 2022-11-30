import { useContext, useMemo } from 'react';
import { DataContext } from '../../ContextData';
import { formSubmit } from '../../handlers';
import { TextField, Button, FormControlLabel, Stack, useMediaQuery, useTheme, SxProps, Theme, Box, Switch } from '@mui/material';
import Base from '../../components/base';
import { BasePaper } from '../../components/Paper';
import { MaterialUISwitch } from '../../components/muiSwitch';
import { HeaderText, PlainText } from '../../components/Typography';
import { HorizontalStackBreakpoint, VerticalStack } from '../../components/Stacks';

const Lobby = () => {
  const { setGameState, players, userName, setUserName, amIMaster, changeTheme, theme, setMyUuid, me } = useContext(DataContext);
  const isBigScreen = useMediaQuery(useTheme().breakpoints.up('md'));

  const paperStyle = useMemo<SxProps<Theme>>(
    () => ({ p: '2rem', display: 'grid', placeItems: 'stretch', width: isBigScreen ? '20vw' : 'unset', height: isBigScreen ? '33vh' : 'unset' }),
    [isBigScreen],
  );

  return (
    <Base
      noPaper
      title="Lobby"
    >
      <HorizontalStackBreakpoint
        ai="stretch"
        spc={2}
      >
        <BasePaper sx={paperStyle}>
          <VerticalStack
            jc="space-between"
            ai="center"
            spc={1}
          >
            <HeaderText text="Client Config" />
            <VerticalStack>
              <FormControlLabel
                control={
                  <MaterialUISwitch
                    checked={theme}
                    onChange={e => changeTheme(e.target.checked)}
                  />
                }
                label="Switch Theme"
                labelPlacement="start"
              />
              <FormControlLabel
                control={<Switch />}
                disabled
                label="Enable Sounds"
                labelPlacement="start"
              />
            </VerticalStack>
            <Button
              fullWidth
              variant="contained"
              disabled
            >
              Log in
            </Button>
          </VerticalStack>
        </BasePaper>
        <BasePaper sx={paperStyle}>
          <VerticalStack
            jc="space-between"
            spc={1}
          >
            <HeaderText text="Unsplarty" />
            {!me ? (
              <form onSubmit={e => formSubmit(e, players, userName, setMyUuid)}>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <TextField
                    id="standard-basic"
                    label="Username"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    // @ts-ignore
                    onSubmit={e => e.form.submit()}
                    variant="outlined"
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                  >
                    Log in to game
                  </Button>
                </Stack>
              </form>
            ) : null}
            {players ? (
              <Button
                disabled={!amIMaster}
                fullWidth
                variant="contained"
                onClick={() => setGameState('gameSelect')}
              >
                Start
              </Button>
            ) : (
              <div />
            )}
          </VerticalStack>
        </BasePaper>
        {players ? (
          <BasePaper sx={paperStyle}>
            <VerticalStack spc={1}>
              <HeaderText text="Players" />
              {Object.values(players).map(player => (
                <PlainText
                  margin="0"
                  key={player.name}
                  text={player.name}
                />
              ))}
            </VerticalStack>
          </BasePaper>
        ) : (
          <Box sx={paperStyle} />
        )}
      </HorizontalStackBreakpoint>
    </Base>
  );
};

export default Lobby;
