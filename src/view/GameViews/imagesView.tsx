import { Button, ButtonGroup, ImageList, ImageListItem, Stack } from '@mui/material';
import { useContext } from 'react';
import Base from '../../components/base';
import { VerticalStack } from '../../components/Stacks';
import { HeaderText } from '../../components/Typography';
import { DataContext } from '../../ContextData';

const ImagesView = () => {
  const { amIMaster, setGameState, imageUrls, currentTheme } = useContext(DataContext);

  return (
    <Base title="Results">
      <VerticalStack spc={1}>
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
        <ButtonGroup
          variant="contained"
          disabled={!amIMaster}
          aria-label="outlined button group"
        >
          <Button onClick={() => setGameState('results')}>Score</Button>
          <Button onClick={() => setGameState('reveal')}>Winning image</Button>
        </ButtonGroup>
      </VerticalStack>
    </Base>
  );
};

export default ImagesView;
