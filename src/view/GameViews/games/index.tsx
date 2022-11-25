import { Suspense, useContext, lazy } from 'react';
import { DataContext } from '../../../ContextData';
import Loading from '../../loading';
const TalkAGuessReversed = lazy(() => import('./talkAGuessReversed'));
const TalkAGuess = lazy(() => import('./talkAGuess'));

const Games = () => {
	const { currentGame } = useContext(DataContext);
	return (
		<Suspense fallback={<Loading />}>
			{currentGame === 'talk&guess' && <TalkAGuess />}
			{currentGame === 'talk&guess reverse' && <TalkAGuessReversed />}
		</Suspense>
	);
};

export default Games;
