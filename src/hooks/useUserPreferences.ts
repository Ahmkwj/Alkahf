import { useState, useEffect } from 'react';

export type Theme = 'dark' | 'light' | 'sepia';
export type FontType = 'elgharib' | 'ibm';

const STORAGE_KEYS = {
  THEME: 'alkahf-theme',
  FONT_SIZE: 'alkahf-font-size',
  FONT_TYPE: 'alkahf-font-type'
} as const;

const getStoredTheme = (): Theme => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.THEME);
    if (stored && ['dark', 'light', 'sepia'].includes(stored)) {
      return stored as Theme;
    }
  } catch (error) {
    
  }
  return 'dark';
};

const getStoredFontSize = (): number => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FONT_SIZE);
    if (stored) {
      const fontSize = parseInt(stored, 10);
      if (fontSize >= 1 && fontSize <= 10) {
        return fontSize;
      }
    }
  } catch (error) {
    
  }
  return 5;
};

const getStoredFontType = (): FontType => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FONT_TYPE);
    if (stored && ['elgharib', 'ibm'].includes(stored)) {
      return stored as FontType;
    }
  } catch (error) {
    
  }
  return 'elgharib';
};

const setStoredTheme = (theme: Theme): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (error) {
    
  }
};

const setStoredFontSize = (fontSize: number): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.FONT_SIZE, fontSize.toString());
  } catch (error) {
    
  }
};

const setStoredFontType = (fontType: FontType): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.FONT_TYPE, fontType);
  } catch (error) {
    
  }
};

export const useUserPreferences = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(getStoredTheme());
  const [fontSizeLevel, setFontSizeLevel] = useState(getStoredFontSize());
  const [currentFont, setCurrentFont] = useState<FontType>(getStoredFontType());

  useEffect(() => {
    document.documentElement.className = currentTheme;
  }, [currentTheme]);

  const changeTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    setStoredTheme(theme);
    document.documentElement.className = theme;
  };

  const increaseFontSize = () => {
    setFontSizeLevel(prev => {
      const newSize = Math.min(prev + 1, 10);
      setStoredFontSize(newSize);
      return newSize;
    });
  };

  const decreaseFontSize = () => {
    setFontSizeLevel(prev => {
      const newSize = Math.max(prev - 1, 1);
      setStoredFontSize(newSize);
      return newSize;
    });
  };

  const changeFontType = (fontType: FontType) => {
    setCurrentFont(fontType);
    setStoredFontType(fontType);
  };

  const getFontSize = (level: number) => {
    return 1.2 + (level - 1) * 0.15;
  };

  const getFontClass = (fontType: FontType) => {
    return fontType === 'ibm' ? 'quran-text-ibm' : 'quran-text';
  };

  const getFontDisplayName = (fontType: FontType) => {
    return fontType === 'ibm' ? 'IBM' : 'الغريب';
  };

  return {
    currentTheme,
    fontSizeLevel,
    currentFont,
    changeTheme,
    increaseFontSize,
    decreaseFontSize,
    changeFontType,
    getFontSize,
    getFontClass,
    getFontDisplayName,
    currentFontSize: getFontSize(fontSizeLevel)
  };
}; 