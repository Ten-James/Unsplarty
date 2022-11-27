import { Suspense, useState, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider, Box } from '@mui/material';
import { darkThemeOption, lightThemeOption } from '../theme';
import { getLocalTheme, setLocalTheme } from '../utils';
import { User } from 'firebase/auth';

import Loading from './loading';

const LoginPage = lazy(() => import('./loginPage'));
const App = lazy(() => import('./App'));
const Fetcher = lazy(() => import('./fetcher'));

const PreApp = () => {
  const [darkTheme, setDarkTheme] = useState(getLocalTheme);
  const [user, setUser] = useState<User>();

  const setTheme = (theme: boolean) => {
    setDarkTheme(theme);
    setLocalTheme(theme);
  };

  return (
    <ThemeProvider theme={darkTheme ? darkThemeOption : lightThemeOption}>
      <Suspense fallback={<Loading />}>
        <Box bgcolor={theme => theme.palette.background.default} className="App">
          <Routes>
            <Route path="/admin" element={user ? <Fetcher user={user} /> : <LoginPage setUser={setUser} />} />
            <Route path="/" element={<App darkTheme={darkTheme} setDarkTheme={setTheme} />} />
            <Route path="*" element={<Loading reason="PAGE NOT FOUND" />} />
          </Routes>
        </Box>
      </Suspense>
    </ThemeProvider>
  );
};

export default PreApp;
