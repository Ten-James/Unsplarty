import { write } from '../firebase/realtime';
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

    // redirect to lobby
    setTimeout(() => (window.location.href = '/'), 2000);
  }, []);

  return <Loading />;
};
export default Admin;
