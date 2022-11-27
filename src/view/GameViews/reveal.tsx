import { Button, ButtonGroup, Stack } from '@mui/material';
import React, { useContext } from 'react';
import Base from '../../components/base';
import { HeaderText, PlainText } from '../../components/Typography';
import { DataContext } from '../../ContextData';

const Reveal = () => {
  const { players, amIMaster, setGameState, imageUrls, currentPlayerUUID, currentTheme } = useContext(DataContext);

  if (Object.entries(players).some(([uuid, p]) => p.name !== undefined && uuid !== currentPlayerUUID && p.lastOpinion === 0)) {
    return (
      <Base title="Results">
        <HeaderText text={`It was ${currentTheme}`} />

        <Stack direction="row" alignItems="center" justifyContent="center">
          <img
            src={imageUrls[0]}
            alt="winning image"
            style={{
              maxHeight: '50vh',
              maxWidth: '50vw',
              display: 'block',
            }}
          />
          <Stack direction="column" alignItems="center" justifyContent="center">
            <HeaderText text="The winner is" />
            {Object.entries(players)
              .filter(([uuid, player]) => player.lastOpinion === 0 && uuid !== currentPlayerUUID)
              .map(([uuid, player]) => player)
              .sort((a, b) => b.score - a.score)
              .map(player => (
                <PlainText key={player.name} text={`${player.name}`} />
              ))}
          </Stack>
        </Stack>
        <Stack sx={{ mt: '1rem' }} direction="row" alignItems="center" justifyContent="center">
          <ButtonGroup variant="contained" aria-label="outlined button group">
            <Button disabled={!amIMaster} onClick={() => setGameState('results')}>
              Score
            </Button>
            <Button disabled={!amIMaster} onClick={() => setGameState('images')}>
              Show All Images
            </Button>
          </ButtonGroup>
        </Stack>
      </Base>
    );
  }

  return (
    <Base title="Results">
      <HeaderText text={'Noone choose it right.'} />
      <HeaderText text={`It was ${currentTheme}`} />

      <Stack direction="row" alignItems="center" justifyContent="center">
        <img
          src={imageUrls[0]}
          alt="winning image"
          style={{
            maxHeight: '50vh',
            maxWidth: '50vw',
            display: 'block',
          }}
        />
      </Stack>
      <Stack sx={{ mt: '1rem' }} direction="row" alignItems="center" justifyContent="center">
        <ButtonGroup variant="contained" aria-label="outlined button group">
          <Button disabled={!amIMaster} onClick={() => setGameState('results')}>
            Score
          </Button>
          <Button disabled={!amIMaster} onClick={() => setGameState('images')}>
            Show All Images
          </Button>
        </ButtonGroup>
      </Stack>
    </Base>
  );
};

export default Reveal;
