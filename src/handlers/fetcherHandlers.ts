import { createApi } from 'unsplash-js';
import { Random } from 'unsplash-js/dist/methods/photos/types';
import { getDocs } from 'firebase/firestore';
import { statusType } from '../view/fetcher';
import { storeGetCollection, storeGetDocument, storeRead, storeWrite } from '../firebase/firestore';
import { themes } from '../utils';

const unsplash = createApi({
  //@ts-ignore
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
});
export const writeAllTemplatesToFirebase = async (onlyNew: boolean, setStatus: React.Dispatch<React.SetStateAction<statusType>>, setLastTime: (a: string) => void) => {
  let templates = [...themes].sort(() => Math.random() - 0.5).slice(0, 50); // api limit;
  if (onlyNew) {
    const data = await storeRead(storeGetDocument('default', 'themes'));
    if (data.exists())
      templates = [...themes]
        .filter(theme => !(data.data()?.themes as string[]).includes(theme))
        .sort(() => Math.random() - 0.5)
        .slice(0, 50);
  }
  setStatus({ count: 0, total: templates.length, status: 'fetching' });
  await templates.forEach(async theme => {
    const result = await unsplash.photos.getRandom({ query: theme, count: 30 });
    if (result.errors) {
      console.error(result.errors[0]);
      return;
    }
    const images = (result.response as Random[]).map((photo: any) => photo.urls.regular);
    const docRef = storeGetDocument('themes', theme);
    const doc = await storeRead(docRef);
    let data = { name: theme, images: images };
    if (doc.exists()) {
      data = { name: theme, images: [...doc.data()?.images, ...images] };
    }
    await storeWrite(docRef, data);

    setStatus(old => ({ count: old.count + 1, total: templates.length, status: `fetching ${theme}` }));
  });

  setLastTime(new Date().toLocaleString());
};

interface themeType {
  name: string;
  images: string[];
}
export const writeAllThemesToFirebase = async () => {
  const themes = await storeGetCollection('themes');
  getDocs(themes).then(async querySnapshot => {
    const themes: themeType[] = [];
    querySnapshot.forEach(doc => {
      themes.push(doc.data() as themeType);
    });
    await storeWrite(storeGetDocument('default', 'themes'), { themes: themes.map(theme => theme.name) });
  });
};
