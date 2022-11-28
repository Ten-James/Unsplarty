import React, { createContext } from 'react';
import { StatusType, ThemesDocumentType } from './types';

export interface AdminContextType {
  lastTime: string;
  setLastTime: (time: string) => void;
  lastCount: number;
  setLastCount: (count: number) => void;
  status: StatusType;
  setStatus: React.Dispatch<React.SetStateAction<StatusType>>;
  themes: ThemesDocumentType;
  setThemes: React.Dispatch<React.SetStateAction<ThemesDocumentType>>;
  newTheme: string;
  setNewTheme: (theme: string) => void;
}

export const AdminContext = createContext<AdminContextType>({
  lastTime: '',
  setLastTime: () => {},
  lastCount: 0,
  setLastCount: () => {},
  status: {
    count: 0,
    total: 0,
    status: '',
  },
  setStatus: () => {},
  themes: {
    themes: [],
    newThemes: [],
  },
  setThemes: () => {},
  newTheme: '',
  setNewTheme: () => {},
});
