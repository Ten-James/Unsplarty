import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import firebaseApp from '.';

const auth = getAuth(firebaseApp);

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};
