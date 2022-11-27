import { Button, ButtonGroup, LinearProgress, Stack, Typography } from '@mui/material';
import React, { useContext } from 'react';
import Base from '../../components/base';
import { HeaderText, PlainText } from '../../components/Typography';
import { DataContext } from '../../ContextData';
import { newRound, resetLobby } from '../../handlers';

interface PlayerViewType {
  name: string;
  score: number;
  playerOpinion: number;
}

const Result = () => {
  const { players, amIMaster, setGameState, nextPlayer } = useContext(DataContext);

  if (
    Object.values(players)
      .sort((a, b) => b.score - a.score)
      .filter(player => player.name !== undefined)
      .some(player => player.score >= 1000)
  ) {
    return (
      <Base title="Results">
        <HeaderText
          text={`The winner is ${
            Object.values(players)
              .sort((a, b) => b.score - a.score)
              .filter(player => player.name !== undefined && player.score >= 1000)
              .map(player => `${player.name} with ${Math.floor(player.score)} points.`)[0]
          }`}
        />
        {Object.values(players)
          .sort((a, b) => b.score - a.score)
          .filter(player => player.name !== undefined)
          .slice(1)
          .map(player => (
            <React.Fragment key={player.name}>
              <PlainText sx={{ textAlign: 'left' }} margin="0" text={`${player.name}:  ${Math.floor(player.score)} points. +${Math.floor(player.addedScore)} ${player.score > 950 ? 'So close...' : ''} `} />
              <LinearProgress variant="determinate" value={Math.min(Math.floor(player.score) / 10, 100)} />
            </React.Fragment>
          ))}
        <Stack sx={{ mt: '1rem' }} direction="row" alignItems="center" justifyContent="center">
          <ButtonGroup variant="contained" aria-label="outlined button group">
            <Button disabled={!amIMaster} onClick={() => resetLobby(players, true)}>
              To lobby
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
      {Object.values(players)
        .sort((a, b) => b.score - a.score)
        .filter(player => player.name !== undefined)
        .map(player => (
          <React.Fragment key={player.name}>
            <PlainText sx={{ textAlign: 'left' }} margin="0" text={`${player.name}:  ${Math.floor(player.score)} Points. +${Math.floor(player.addedScore)} `} />
            <LinearProgress variant="determinate" value={Math.min(Math.floor(player.score) / 10, 100)} />
          </React.Fragment>
        ))}
      <Stack sx={{ mt: '1rem' }} direction="row" alignItems="center" justifyContent="center">
        <ButtonGroup variant="contained" aria-label="outlined button group">
          <Button disabled={!amIMaster} onClick={() => resetLobby(players, true)}>
            To lobby
          </Button>
          <Button disabled={!amIMaster} onClick={() => newRound(players, nextPlayer, setGameState)}>
            Continue
          </Button>
          <Button disabled={!amIMaster} onClick={() => setGameState('images')}>
            Show All Images
          </Button>
        </ButtonGroup>
      </Stack>
    </Base>
  );
};

export default Result;
