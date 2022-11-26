import { Button, Stack } from '@mui/material';
import React, { useContext } from 'react';
import Base from '../../components/base';
import { HeaderText, PlainText } from '../../components/Typography';
import { DataContext } from '../../ContextData';

const Reveal = () => {
  const { players, amIMaster, setGameState, imageUrls, currentPlayerUUID } = useContext(DataContext);
  console.log('uuid', currentPlayerUUID);
  return (
    <Base title="Results">
      <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
        <Stack spacing={2} sx={{ height: '80vh' }} direction="column" alignItems="center" justifyContent="space-around">
          <HeaderText text={Object.values(players).some(p => p.lastOpinion === 0) ? 'Players who choose it right' : 'Noone choose it right.'} />
          <Stack spacing={2} direction="column" alignItems="center" justifyContent="center">
            {Object.entries(players)
              .filter(([uuid, player]) => player.lastOpinion === 0 && uuid !== currentPlayerUUID)
              .map(([uuid, player]) => player)
              .sort((a, b) => b.score - a.score)
              .map(player => (
                <React.Fragment key={player.name}>
                  <PlainText sx={{ textAlign: 'left' }} text={`${player.name} choosed it right.`} />
                </React.Fragment>
              ))}
          </Stack>
          {amIMaster ? (
            <Button fullWidth sx={{ marginTop: '1rem' }} variant="outlined" onClick={() => setGameState('results')}>
              Results
            </Button>
          ) : players ? (
            <PlainText text="Waiting for master to show results" />
          ) : null}
        </Stack>
        <img
          src={imageUrls[0]}
          alt="winning image"
          style={{
            maxWidth: '50%',
            maxHeight: '50%',
            display: 'block',
            margin: '2em auto',
          }}
        />
      </Stack>
    </Base>
  );
};

export default Reveal;
