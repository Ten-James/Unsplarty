import { write } from '../firebase';
import { useEffect } from 'react';
import Loading from './loading';

const Admin = () => {
	useEffect(() => {
		write('gameState', 'lobby');
		write('players', []);
		write('theme', '');
		write('image', '');
		write('playerOrder', []);
		write('fakeImage', []);
		write('playerOpinions', []);
		write('playerScores', []);
		write('playerStreaks', []);

		// redirect to lobby
		setTimeout(() => (window.location.href = '/'), 2000);
	}, []);

	return <Loading />;
};
export default Admin;
