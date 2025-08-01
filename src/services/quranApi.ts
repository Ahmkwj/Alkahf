export interface QuranVerse {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

export interface QuranEdition {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
}

export interface SurahInfo {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface SurahApiResponse {
  code: number;
  status: string;
  data: {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
    ayahs: QuranVerse[];
    edition: QuranEdition;
  };
}

export interface MultiEditionSurahResponse {
  code: number;
  status: string;
  data: Array<{
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
    ayahs: QuranVerse[];
    edition: QuranEdition;
  }>;
}

export interface ProcessedVerse {
  number: number;
  numberInSurah: number;
  arabic: string;
  transliteration?: string;
  translation: string;
  page: number;
  juz: number;
}

const BASE_URL = 'https://api.alquran.cloud/v1';
const SURAH_NUMBER = 18;
const CACHE_DURATION = 5 * 60 * 1000;

let cachedVerses: ProcessedVerse[] | null = null;
let cachedSurahInfo: SurahInfo | null = null;
let cacheTimestamp: number = 0;

const isCacheValid = (): boolean => {
  return cachedVerses !== null && (Date.now() - cacheTimestamp) < CACHE_DURATION;
};

export const fetchSurahAlKahfComplete = async (): Promise<ProcessedVerse[]> => {
  if (isCacheValid() && cachedVerses) {
    return cachedVerses;
  }

  const editions = 'quran-simple-enhanced,en.sahih';
  const url = `${BASE_URL}/surah/${SURAH_NUMBER}/editions/${editions}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: MultiEditionSurahResponse = await response.json();
    
    if (data.code !== 200 || !data.data || data.data.length === 0) {
      throw new Error('Invalid API response');
    }

    const arabicSurah = data.data.find(surah => surah.edition.identifier === 'quran-simple-enhanced');
    const englishSurah = data.data.find(surah => surah.edition.identifier === 'en.sahih');

    if (!arabicSurah || !englishSurah) {
      throw new Error('Required surah editions not found');
    }

    if (arabicSurah.ayahs.length !== englishSurah.ayahs.length) {
      throw new Error('Mismatch in verse count between editions');
    }

    const processedVerses: ProcessedVerse[] = arabicSurah.ayahs.map((arabicVerse, index) => {
      const englishVerse = englishSurah.ayahs[index];
      
      return {
        number: arabicVerse.number,
        numberInSurah: arabicVerse.numberInSurah,
        arabic: arabicVerse.text,
        translation: englishVerse.text,
        page: arabicVerse.page,
        juz: arabicVerse.juz,
      };
    });

    cachedVerses = processedVerses;
    cacheTimestamp = Date.now();

    return processedVerses;

  } catch (error) {
    console.error('Error fetching Surah Al-Kahf:', error);
    throw error;
  }
};

export const fetchSurahAlKahfVerses = async (startVerse: number = 1, endVerse: number = 10): Promise<ProcessedVerse[]> => {
  try {
    const allVerses = await fetchSurahAlKahfComplete();
    return allVerses.slice(startVerse - 1, endVerse);
  } catch (error) {
    console.error(`Error fetching verses ${startVerse}-${endVerse}:`, error);
    throw error;
  }
};

export const fetchFirstTenVerses = async (): Promise<ProcessedVerse[]> => {
  return fetchSurahAlKahfVerses(1, 10);
};

export const fetchAllSurahAlKahfVerses = fetchSurahAlKahfComplete;

export const getSurahInfo = async (): Promise<SurahInfo> => {
  if (isCacheValid() && cachedSurahInfo) {
    return cachedSurahInfo;
  }

  const url = `${BASE_URL}/surah/${SURAH_NUMBER}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: SurahApiResponse = await response.json();
    
    if (data.code !== 200 || !data.data) {
      throw new Error('Invalid API response');
    }

    const surahInfo: SurahInfo = {
      number: data.data.number,
      name: data.data.name,
      englishName: data.data.englishName,
      englishNameTranslation: data.data.englishNameTranslation,
      numberOfAyahs: data.data.numberOfAyahs,
      revelationType: data.data.revelationType,
    };

    cachedSurahInfo = surahInfo;
    return surahInfo;

  } catch (error) {
    console.error('Error fetching surah info:', error);
    throw error;
  }
};

export const clearApiCache = (): void => {
  cachedVerses = null;
  cachedSurahInfo = null;
  cacheTimestamp = 0;
};