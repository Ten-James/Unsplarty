import { Button, ButtonGroup, ImageList, ImageListItem, Stack } from '@mui/material';
import React, { useContext } from 'react';
import Base from '../../components/base';
import { HeaderText, PlainText } from '../../components/Typography';
import { DataContext } from '../../ContextData';

const ImagesView = () => {
  const { amIMaster, setGameState, imageUrls, currentPlayerUUID, currentTheme } = useContext(DataContext);

  return (
    <Base title="Results">
      <HeaderText text={`It was ${currentTheme}`} />
      <ImageList
        variant="masonry"
        cols={window.innerWidth > 1300 ? 4 : 2}
        gap={1}
        sx={{ width: '80vw', maxHeight: '80vh' }}
      >
        {imageUrls.map(url => (
          <ImageListItem key={url}>
            <img
              src={url}
              alt=""
            />
          </ImageListItem>
        ))}
      </ImageList>
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
            onClick={() => setGameState('reveal')}
          >
            Winning image
          </Button>
        </ButtonGroup>
      </Stack>
    </Base>
  );
};

export default ImagesView;
