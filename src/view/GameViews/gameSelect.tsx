import { useContext } from 'react';
import { DataContext } from '../../ContextData';
import { StartGame } from '../../handlers';
import { Grid, Button, ButtonGroup, Typography } from '@mui/material';
import Base from '../../components/base';
import { HeaderText, PlainText } from '../../components/Typography';
import { GAMEMODES, getGameModeDescription } from '../../utils';

export default function GameSelect() {
  const { currentGame, setCurrentGame, amIMaster, players, userName } = useContext(DataContext);
  return (
    <Base title="Game Select">
      <HeaderText text={`Current game: ${currentGame}`} />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ margin: '2em 0' }}
      >
        <ButtonGroup variant="outlined">
          {GAMEMODES.map(game => (
            <Button
              key={game.name}
              disabled={!amIMaster}
              variant={currentGame === game.name ? 'contained' : 'outlined'}
              onClick={() => setCurrentGame(game.name)}
            >
              {game.name}
            </Button>
          ))}
        </ButtonGroup>
      </Grid>
      <PlainText
        sx={{ maxWidth: '50vw' }}
        text={getGameModeDescription(currentGame)}
      />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ padding: '0.3em' }}
      >
        <Button
          fullWidth
          variant="contained"
          disabled={!amIMaster}
          onClick={() => StartGame(players)}
        >
          Start
        </Button>
      </Grid>
    </Base>
  );
}
