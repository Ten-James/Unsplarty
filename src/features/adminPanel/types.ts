export interface StatusType {
  count: number;
  total: number;
  status: string;
}

export interface ThemesDocumentType {
  themes: string[];
  newThemes: string[];
}

export interface ThemeDocumentType {
  name: string;
  images: string[];
}
