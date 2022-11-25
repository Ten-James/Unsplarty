import { Suspense, useState, lazy } from 'react';
import { ThemeProvider } from '@mui/material';
import { darkThemeOption, lightThemeOption } from '../theme';
import Loading from './loading';
import { getLocalTheme, setLocalTheme } from '../utils';
const App = lazy(() => import('./App'));

const PreApp = () => {
	const [darkTheme, setDarkTheme] = useState(getLocalTheme);

	const setTheme = (theme: boolean) => {
		setDarkTheme(theme);
		setLocalTheme(theme);
	};

	return (
		<ThemeProvider theme={darkTheme ? darkThemeOption : lightThemeOption}>
			<Suspense fallback={<Loading />}>
				<App
					darkTheme={darkTheme}
					setDarkTheme={setTheme}
				/>
			</Suspense>
		</ThemeProvider>
	);
};

export default PreApp;
