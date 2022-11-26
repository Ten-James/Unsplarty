export const getLocalName = () => localStorage.getItem('lastUserName') || '';
export const setLocalName = (name: string) => localStorage.setItem('lastUserName', name);

export const getLocalTheme = () => localStorage.getItem('lastTheme') === 'true' || false;
export const setLocalTheme = (dark: boolean) => localStorage.setItem('lastTheme', dark.toString());

export const CreateUUID = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};

export const getBase64FromUrl = async (url: string): Promise<string> => {
	const data = await fetch(url);
	const blob = await data.blob();
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onloadend = () => {
			const base64data = reader.result;
			resolve(base64data as string);
		};
	});
};

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const loadingQuotes: string[] = ["Yea I'm loading", 'Loading is fun', "You know that it's loading", "Loading is not a bug, it's a feature", 'James is loading', 'Loading is lie', 'Loading is life', 'Loading is love'];

export const GAMEMODES = [
	{
		name: 'talk&guess',
		description: 'One player is the chooser, the others are guessers. The chooser chooses a theme and describes it to the guessers. The guessers try to guess the picture in hurry of time.',
	},
	{
		name: 'talk&guess reverse',
		description: 'One player is the chooser. The chooser chooses a theme and he has to guess the picture in hurry of time. The others are guessers. The guessers try to describe the picture to the chooser.',
	},
];

export const getGameModeDescription = (currentName: string): string => {
	const gameMode = GAMEMODES.find((gameMode) => gameMode.name === currentName);
	return gameMode ? gameMode.description : '';
};
const themes = ['Civilization', 'Studio', 'Garden', 'Animal', 'Vegetable', 'Mineral', 'Fruit', 'Vehicle', 'Weapon', 'Furniture', 'Clothing', 'Food', 'Flower', 'Tree', 'Bird', 'Fish', 'Buildings', 'Sports'];

export const get3Themes = () => [...themes].sort(() => Math.random() - 0.5).slice(0, 3);
