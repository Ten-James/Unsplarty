import { User } from 'firebase/auth';
import { signInWithGoogle } from '../firebase/auth';

export const signInWithGoogleHandler = (setUser: (user: User) => void) => {
  signInWithGoogle()
    .then(result => {
      setUser(result.user);
    })
    .catch(error => {
      console.log(error);
    });
};
