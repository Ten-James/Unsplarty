import { getDocs } from 'firebase/firestore';
import {useState, useEffect} from 'react';
import { storeGetCollection } from '../firebase';
interface themeType {
    name: string;
    images: string[];
}
export const useThemes = () => {
    const [themes, setThemes] = useState<themeType[]>([]);

    useEffect(() => {
    getDocs(storeGetCollection('themes')).then((querySnapshot) => {
        const themes: themeType[] = [];
        querySnapshot.forEach((doc) => {
            themes.push(doc.data() as themeType);
        });
        setThemes((old)=>[...old, ...themes]);
    });
    }, []);

    const get3Themes = (): string[] => themes.sort(() => Math.random() - 0.5).slice(0, 3).map(theme => theme.name);
    const get4Images = (theme: string): string[] => themes.find(t => t.name === theme)?.images.sort(() => Math.random() - 0.5).slice(0, 4) || [];

    return [ get3Themes, get4Images ] as const;
    

};