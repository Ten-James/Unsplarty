import { useState, useEffect } from 'react';
import { subscribe, write } from '../firebase';

export function useDatabase<T>(name: string, defaultValue: T) {
	const [data, setData] = useState<T>(defaultValue);

	useEffect(() => {
		subscribe(name, setData);
	}, []);

	function writeData(data: T) {
		write(name, data);
	}

	return [data, writeData] as const;
}
