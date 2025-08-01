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

export interface AudioVerse {
  number: number;
  numberInSurah: number;
  text: string;
  audio: string;
}

export interface AudioApiResponse {
  code: number;
  status: string;
  data: {
    number: number;
    name: string;
    englishName: string;
    numberOfAyahs: number;
    ayahs: AudioVerse[];
    edition: QuranEdition;
  };
}

const BASE_URL = 'https://api.alquran.cloud/v1';
const SURAH_NUMBER = 18;
const CACHE_DURATION = 5 * 60 * 1000;

let cachedVerses: ProcessedVerse[] | null = null;
let cacheTimestamp: number = 0;

let cachedAudioData: Map<number, string> | null = null;
let audioCacheTimestamp: number = 0;

const isCacheValid = (): boolean => {
  return cachedVerses !== null && (Date.now() - cacheTimestamp) < CACHE_DURATION;
};

const isAudioCacheValid = (): boolean => {
  return cachedAudioData !== null && (Date.now() - audioCacheTimestamp) < CACHE_DURATION;
};

export const fetchSurahAlKahfComplete = async (): Promise<ProcessedVerse[]> => {
  if (isCacheValid() && cachedVerses) {
    return cachedVerses;
  }

  const editions = 'quran-simple-enhanced,en.sahih';
  const url = `${BASE_URL}/surah/${SURAH_NUMBER}/editions/${editions}`;
  
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
};

export const fetchSurahAlKahfAudio = async (): Promise<Map<number, string>> => {
  if (isAudioCacheValid() && cachedAudioData) {
    return cachedAudioData;
  }

  const url = `${BASE_URL}/surah/${SURAH_NUMBER}/ar.alafasy`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: AudioApiResponse = await response.json();
    
    if (data.code !== 200 || !data.data || !data.data.ayahs) {
      throw new Error('Invalid audio API response');
    }

    const audioMap = new Map<number, string>();
    data.data.ayahs.forEach((ayah) => {
      if (ayah.audio && ayah.audio.trim() !== '') {
        audioMap.set(ayah.numberInSurah, ayah.audio);
      }
    });

    cachedAudioData = audioMap;
    audioCacheTimestamp = Date.now();

    return audioMap;
  } catch (error) {
    console.error('Error fetching audio data:', error);
    throw new Error('Failed to fetch audio data. Please check your connection and try again.');
  }
};

export const getAudioUrlForVerse = async (verseNumber: number): Promise<string | null> => {
  try {
    const audioMap = await fetchSurahAlKahfAudio();
    return audioMap.get(verseNumber) || null;
  } catch (error) {
    console.error('Error getting audio URL for verse:', verseNumber, error);
    return null;
  }
};

export const clearApiCache = (): void => {
  cachedVerses = null;
  cacheTimestamp = 0;
  cachedAudioData = null;
  audioCacheTimestamp = 0;
};