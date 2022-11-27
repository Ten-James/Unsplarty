import { Suspense, useContext, lazy } from 'react';
import { DataContext } from '../../../ContextData';
import Loading from '../../loading';
import Timeout from '../timeout';
const TalkAGuessReversed = lazy(() => import('./talkAGuessReversed'));
const TalkAGuess = lazy(() => import('./talkAGuess'));

const Games = () => {
  const { currentGame, timer } = useContext(DataContext);
  if (timer > 0) {
    return <Timeout />;
  }
  return (
    <Suspense fallback={<Loading />}>
      {currentGame === 'talk&guess' && <TalkAGuess />}
      {currentGame === 'talk&guess reverse' && <TalkAGuessReversed />}
    </Suspense>
  );
};

export default Games;
