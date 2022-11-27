import { createApi } from 'unsplash-js';
import { Random } from 'unsplash-js/dist/methods/photos/types';
import { getDocs } from 'firebase/firestore';
import { statusType, ThemesDocumentType } from '../view/fetcher';
import { storeGetCollection, storeGetDocument, storeRead, storeWrite } from '../firebase/firestore';

const unsplash = createApi({
  //@ts-ignore
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
});

export const howManyICanFetch = (lastTime: string, lastCount: number): number => (new Date(lastTime).getDate() === new Date().getDate() && new Date(lastTime).getHours() === new Date().getHours() ? 50 - lastCount : 50);

export const writeAllTemplatesToFirebase = async (onlyNew: boolean, setStatus: React.Dispatch<React.SetStateAction<statusType>>, lastTime: string, setLastTime: (a: string) => void, lastCount: number, setLastCount: (a: number) => void) => {
  const howManyICanFetchNow = howManyICanFetch(lastTime, lastCount);

  const data = await storeRead(storeGetDocument('default', 'themes'));
  if (!data.exists()) return;
  let templates = [...data.data()?.themes, ...data.data()?.newThemes].sort(() => Math.random() - 0.5).slice(0, howManyICanFetchNow); // api limit;
  if (onlyNew) {
    templates = [...data.data()?.newThemes]
      .filter(theme => !(data.data()?.themes as string[]).includes(theme))
      .sort(() => Math.random() - 0.5)
      .slice(0, howManyICanFetchNow);
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

  setLastTime(new Date().toString());
  setLastCount(templates.length);
};

export const writeAllThemesToFirebase = async (setter: React.Dispatch<React.SetStateAction<ThemesDocumentType>>) => {
  const themes = await storeGetCollection('themes');
  const defaultThemes = await storeRead(storeGetDocument('default', 'themes'));
  if (!defaultThemes.exists()) return;
  const defaultThemesData = defaultThemes.data() as ThemesDocumentType;
  getDocs(themes).then(async querySnapshot => {
    const mappedThemes: string[] = [];
    querySnapshot.forEach(doc => {
      mappedThemes.push(doc.data()?.name as string);
    });
    await storeWrite(storeGetDocument('default', 'themes'), { themes: mappedThemes, newThemes: [...defaultThemesData?.newThemes].filter(theme => !mappedThemes.includes(theme)) } as ThemesDocumentType);
    setter({ themes: mappedThemes, newThemes: [...defaultThemesData?.newThemes].filter(theme => !mappedThemes.includes(theme)) } as ThemesDocumentType);
  });
};
