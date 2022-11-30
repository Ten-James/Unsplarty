import { useContext } from 'react';
import { DataContext } from '../../ContextData';
import { StartGame } from '../../handlers';
import { Button, ButtonGroup } from '@mui/material';
import Base from '../../components/base';
import { HeaderText, PlainText } from '../../components/Typography';
import { GAME_MODES, getGameModeDescription } from '../../utils';
import { VerticalStack } from '../../components/Stacks';

export default function GameSelect() {
  const { currentGame, setCurrentGame, amIMaster, players } = useContext(DataContext);
  return (
    <Base title="Game Select">
      <VerticalStack spc={2}>
        <HeaderText text={`Current game: ${currentGame}`} />
        <ButtonGroup variant="outlined">
          {GAME_MODES.map(game => (
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
        <PlainText
          sx={{ maxWidth: '50vw' }}
          text={getGameModeDescription(currentGame)}
        />
        <Button
          fullWidth
          variant="contained"
          disabled={!amIMaster}
          onClick={() => StartGame(players)}
        >
          Start
        </Button>
      </VerticalStack>
    </Base>
  );
}
