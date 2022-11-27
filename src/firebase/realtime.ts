import { getDatabase, ref, set, get, onValue } from 'firebase/database';
import { PlayerType } from '../view/App';
import firebaseApp from '.';

const db = getDatabase(firebaseApp);

export const write = (path: string, data: any) => {
  set(ref(db, path), data);
  console.log(JSON.stringify(data));
};

export const read = (path: string, setter: (a: any) => void) => {
  get(ref(db, path))
    .then(snapshot => {
      if (snapshot.exists()) {
        setter(snapshot.val());
      } else {
        console.log('No data available');
      }
    })
    .catch(error => {
      console.error(error);
    });
};

export const subscribe = (path: string, setter: (a: any) => void) => {
  onValue(ref(db, path), snapshot => {
    const data = snapshot.val();
    setter(data);
    if (path === 'players') console.log(path, snapshot.val() as { [key: string]: PlayerType });
  });
};
