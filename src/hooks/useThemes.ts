import { getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { storeGetCollection, storeGetDocument, storeRead } from '../firebase/firestore';
export const useThemes = () => {
  const [themes, setThemes] = useState<string[]>([]);

  useEffect(() => {
    storeRead(storeGetDocument('default', 'themes')).then(data => {
      if (data.exists()) setThemes(data.data().themes as string[]);
    });
  }, []);

  const get3Themes = (): string[] => themes.sort(() => Math.random() - 0.5).slice(0, 3);

  const get4Images = async (theme: string): Promise<string[]> =>
    await storeRead(storeGetDocument('themes', theme)).then(data => (data.exists() ? [...(data.data()?.images as string[])].sort(() => Math.random() - 0.5).slice(0, 4) : []));

  return [get3Themes, get4Images] as const;
};
