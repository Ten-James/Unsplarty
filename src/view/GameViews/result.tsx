import { Button, ButtonGroup, LinearProgress, Stack, Typography } from '@mui/material';
import React, { useContext, useMemo } from 'react';
import Base from '../../components/base';
import { VerticalStack } from '../../components/Stacks';
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

  const DidAnyoneWin = useMemo(
    () =>
      Object.values(players)
        .sort((a, b) => b.score - a.score)
        .filter(player => player.name !== undefined)
        .some(player => player.score >= 1000),
    [players],
  );

  const PlayerViews = useMemo(
    () =>
      Object.entries(players)
        .map(([uuid, player]) => player)
        .sort((a, b) => b.score - a.score)
        .filter(player => player.name !== undefined),
    [players],
  );

  if (DidAnyoneWin) {
    return (
      <Base title="Results">
        <VerticalStack
          ai="stretch"
          spc={2}
        >
          <HeaderText text={`The winner is ${PlayerViews.map(player => `${player.name} with ${Math.floor(player.score)} points.`)[0]}`} />
          <div>
            {PlayerViews.slice(1).map(player => (
              <React.Fragment key={player.name}>
                <PlainText
                  sx={{ textAlign: 'left' }}
                  margin="0"
                  text={`${player.name}:  ${Math.floor(player.score)} points. +${Math.floor(player.addedScore)} ${player.score > 950 ? 'So close...' : ''} `}
                />
                <LinearProgress
                  variant="determinate"
                  value={Math.min(Math.floor(player.score) / 10, 100)}
                />
              </React.Fragment>
            ))}
          </div>
          <ButtonGroup
            variant="contained"
            aria-label="outlined button group"
            disabled={!amIMaster}
          >
            <Button onClick={() => resetLobby(players, true)}>To lobby</Button>
            <Button onClick={() => setGameState('images')}>Show All Images</Button>
          </ButtonGroup>
        </VerticalStack>
      </Base>
    );
  }

  return (
    <Base title="Results">
      <VerticalStack
        ai="stretch"
        spc={2}
      >
        <div>
          {PlayerViews.map(player => (
            <React.Fragment key={player.name}>
              <PlainText
                sx={{ textAlign: 'left' }}
                margin="0"
                text={`${player.name}:  ${Math.floor(player.score)} Points. +${Math.floor(player.addedScore)} `}
              />
              <LinearProgress
                variant="determinate"
                value={Math.min(Math.floor(player.score) / 10, 100)}
              />
            </React.Fragment>
          ))}
        </div>
        <ButtonGroup
          variant="contained"
          aria-label="outlined button group"
          disabled={!amIMaster}
        >
          <Button onClick={() => newRound(players, nextPlayer, setGameState)}>Continue</Button>
          <Button onClick={() => setGameState('images')}>Show All Images</Button>
        </ButtonGroup>
      </VerticalStack>
    </Base>
  );
};

export default Result;
