import { useContext } from 'react';
import { DataContext } from '../../ContextData';
import { formSubmit } from '../../handlers';
import { Paper, List, ListItem, ListItemText, TextField, Button, FormControlLabel, Stack } from '@mui/material';
import Base from '../../components/base';
import { MaterialUISwitch } from '../../components/muiSwitch';
import { HeaderText, PlainText } from '../../components/Typography';

const Lobby = () => {
  const { setGameState, players, userName, setUserName, amIMaster, changeTheme, theme, setMyUuid, me } = useContext(DataContext);

  return (
    <Base noPaper title="Lobby">
      <Paper elevation={3} style={{ padding: '2rem' }}>
        {players ? (
          <>
            <HeaderText margin="0" text="Players" />
            {Object.values(players).map(player => (
              <PlainText margin="0" sx={{ textAlign: 'left' }} key={player.name} text={player.name} />
            ))}
          </>
        ) : null}
        {!me ? (
          <form onSubmit={e => formSubmit(e, players, userName, setMyUuid)}>
            <Stack sx={{ mt: '1rem' }} direction="column" justifyContent="center" alignItems="center" spacing={2}>
              <TextField
                id="standard-basic"
                label="Username"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                // @ts-ignore
                onSubmit={e => e.form.submit()}
                variant="outlined"
              />
              <Button fullWidth variant="contained" type="submit">
                Log in to game
              </Button>
            </Stack>
          </form>
        ) : null}
        {players && me ? (
          <Button sx={{ mt: '1rem' }} disabled={!amIMaster} fullWidth variant="contained" onClick={() => setGameState('gameSelect')}>
            Start
          </Button>
        ) : null}
      </Paper>
      <Stack sx={{ mt: '1rem' }} direction="row" justifyContent="center" alignItems="center" spacing={2}>
        <FormControlLabel control={<MaterialUISwitch checked={theme} onChange={e => changeTheme(e.target.checked)} />} label="Switch Theme" />
      </Stack>
    </Base>
  );
};

export default Lobby;
