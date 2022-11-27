import { useEffect, useContext, useState } from 'react';
import { DataContext } from '../../../ContextData';
import { ImageList, ImageListItem, LinearProgress } from '@mui/material';
import Base from '../../../components/base';
import { HeaderText } from '../../../components/Typography';

export default function TalkAGuess() {
  const { amIChooser, imageUrls, onVote, setGameState, players } = useContext(DataContext);
  const [timer, setTimer] = useState(100);
  const [images, setImages] = useState([...imageUrls].sort(() => Math.random() - 0.5));
  const [Phase, setPhase] = useState(0);
  const [chosenImage, setChosenImage] = useState('');

  useEffect(() => {
    if (amIChooser) onVote(0, 0);
    let interval: NodeJS.Timer;
    setTimeout(() => {
      setPhase(1);
      interval = setInterval(() => {
        setTimer(timer => timer - 0.1);
      }, 10);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (amIChooser) if (timer <= 0 || Object.values(players).every(player => player.name !== undefined && player.lastOpinion !== -1)) setGameState('reveal');
  }, [timer, players, setGameState]);
  if (amIChooser) {
    if (Phase === 0)
      return (
        <Base title="Game" noPaper>
          <img
            id="mainPicture"
            src={imageUrls[0]}
            style={{
              maxWidth: '50%',
              maxHeight: '50%',
              display: 'block',
              margin: '2em auto',
            }}
            alt=""
          />
        </Base>
      );
    return (
      <Base title="Game">
        <HeaderText text="Describe the picture" />
        <LinearProgress variant="determinate" value={timer} />
      </Base>
    );
  }

  if (Phase === 0) {
    return (
      <Base title="Game">
        <HeaderText text="Prepare for pictures" />
      </Base>
    );
  }

  return (
    <Base title="Game" noPaper={!chosenImage}>
      {chosenImage ? (
        <HeaderText text="You have already chosen." />
      ) : (
        <ImageList variant="masonry" cols={window.innerWidth > 1300 ? 4 : 2} gap={1} sx={{ width: '80vw' }}>
          {images.map(url => (
            <ImageListItem
              key={url}
              onClick={() => {
                setChosenImage(url);
                onVote(imageUrls.indexOf(url), new Date().getTime());
              }}
            >
              <img src={url} alt="" />
            </ImageListItem>
          ))}
        </ImageList>
      )}
      <LinearProgress variant="determinate" value={timer} />
    </Base>
  );
}
