import { Button, ButtonGroup, Stack } from '@mui/material';
import React, { useContext, useMemo } from 'react';
import Base from '../../components/base';
import { HorizontalStack, VerticalStack } from '../../components/Stacks';
import { HeaderText, PlainText } from '../../components/Typography';
import { DataContext } from '../../ContextData';

const Reveal = () => {
  const { players, amIMaster, setGameState, imageUrls, currentPlayerUUID, currentTheme } = useContext(DataContext);

  const DidAnyoneWin = useMemo(() => Object.entries(players).some(([uuid, p]) => p.name !== undefined && uuid !== currentPlayerUUID && p.lastOpinion === 0), [players, currentPlayerUUID]);

  if (DidAnyoneWin) {
    const Winners = useMemo(
      () =>
        Object.entries(players)
          .filter(([uuid, player]) => player.lastOpinion === 0 && uuid !== currentPlayerUUID)
          .map(([uuid, player]) => player)
          .sort((a, b) => b.score - a.score),
      [players, currentPlayerUUID],
    );
    return (
      <Base title="Results">
        <VerticalStack spc={1}>
          <HeaderText text={`It was ${currentTheme}`} />
          <HorizontalStack>
            <img
              src={imageUrls[0]}
              alt="winning image"
              style={{
                maxHeight: '50vh',
                maxWidth: '50vw',
                display: 'block',
              }}
            />
            <VerticalStack>
              {Winners.length === 1 ? <HeaderText text="The winner is" /> : <HeaderText text="The winners are" />}
              {Winners.map(player => (
                <PlainText
                  key={player.name}
                  text={`${player.name} +${Math.floor(player.addedScore)}`}
                />
              ))}
            </VerticalStack>
          </HorizontalStack>
          <ButtonGroup
            variant="contained"
            disabled={!amIMaster}
            aria-label="outlined button group"
          >
            <Button onClick={() => setGameState('results')}>Score</Button>
            <Button onClick={() => setGameState('images')}>Show All Images</Button>
          </ButtonGroup>
        </VerticalStack>
      </Base>
    );
  }

  return (
    <Base title="Results">
      <HeaderText text={'No one choose it right.'} />
      <HeaderText text={`It was ${currentTheme}`} />

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
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
      <Stack
        sx={{ mt: '1rem' }}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <ButtonGroup
          variant="contained"
          aria-label="outlined button group"
        >
          <Button
            disabled={!amIMaster}
            onClick={() => setGameState('results')}
          >
            Score
          </Button>
          <Button
            disabled={!amIMaster}
            onClick={() => setGameState('images')}
          >
            Show All Images
          </Button>
        </ButtonGroup>
      </Stack>
    </Base>
  );
};

export default Reveal;
