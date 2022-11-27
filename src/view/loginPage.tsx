import Base from '../components/base';
import { Button } from '@mui/material';
import { signInWithGoogleHandler } from '../handlers/loginPageHandlers';
import { User } from 'firebase/auth';
import { HeaderText, PlainText } from '../components/Typography';

interface LoginPageProps {
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}
const LoginPage = ({ setUser }: LoginPageProps) => {
  return (
    <Base title="login">
      <HeaderText text="Login" />
      <Button fullWidth variant="contained" onClick={() => signInWithGoogleHandler(setUser)}>
        Login with Google
      </Button>
      <PlainText text="You need to have admin rights anyway." />
      <Button href="\" fullWidth variant="contained">
        To lobby
      </Button>
    </Base>
  );
};
export default LoginPage;
