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

export interface TafseerInfo {
  id: number;
  name: string;
  language: string;
  author: string;
  book_name: string;
}

export interface TafseerResponse {
  tafseer_id: number;
  tafseer_name: string;
  ayah_url: string;
  ayah_number: number;
  text: string;
}

const BASE_URL = 'https://api.alquran.cloud/v1';
const TAFSEER_BASE_URL = 'http://api.quran-tafseer.com';
const SURAH_NUMBER = 18;
const CACHE_DURATION = 5 * 60 * 1000;

let cachedVerses: ProcessedVerse[] | null = null;
let cacheTimestamp: number = 0;

let cachedAudioData: Map<number, string> | null = null;
let audioCacheTimestamp: number = 0;

let cachedTafseerList: TafseerInfo[] | null = null;
let tafseerListCacheTimestamp: number = 0;

let cachedTafseerData: Map<string, TafseerResponse> | null = null;
let tafseerDataCacheTimestamp: number = 0;

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

  const processedVerses: ProcessedVerse[] = [];
  
  const basmala = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';
  processedVerses.push({
    number: 0,
    numberInSurah: 0,
    arabic: basmala,
    translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
    page: arabicSurah.ayahs[0].page,
    juz: arabicSurah.ayahs[0].juz,
  });
  
  arabicSurah.ayahs.forEach((arabicVerse, index) => {
    const englishVerse = englishSurah.ayahs[index];
    
    let arabicText = arabicVerse.text;
    
    if (arabicVerse.numberInSurah === 1) {
      arabicText = arabicText.replace(basmala, '').trim();
      
      if (arabicText === arabicVerse.text) {
        const normalizedBasmala = basmala.normalize('NFKC');
        const normalizedText = arabicText.normalize('NFKC');
        arabicText = normalizedText.replace(normalizedBasmala, '').trim();
      }
      
      if (arabicText === arabicVerse.text || arabicText.startsWith('بِسْمِ اللَّهِ')) {
        const hamdallaIndex = arabicText.indexOf('الْحَمْدُ');
        if (hamdallaIndex > 0) {
          arabicText = arabicText.substring(hamdallaIndex).trim();
        } else {
          const patterns = [
            'الْحَمْدِ لِلَّهِ',
            'الْحَمْدُ لِلَّهِ', 
            'ٱلْحَمْدُ لِلَّهِ'
          ];
          
          for (const pattern of patterns) {
            const patternIndex = arabicText.indexOf(pattern);
            if (patternIndex > 0) {
              arabicText = arabicText.substring(patternIndex).trim();
              break;
            }
          }
        }
      }
      
      if (arabicText.startsWith('بِسْمِ')) {
        const words = arabicText.split(' ');
        if (words.length > 4) {
          arabicText = words.slice(4).join(' ').trim();
        }
      }
    }
    
    processedVerses.push({
      number: arabicVerse.number,
      numberInSurah: arabicVerse.numberInSurah,
      arabic: arabicText,
      translation: englishVerse.text,
      page: arabicVerse.page,
      juz: arabicVerse.juz,
    });
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
    throw new Error('Failed to fetch audio data. Please check your connection and try again.');
  }
};

export const getAudioUrlForVerse = async (verseNumber: number): Promise<string | null> => {
  try {
    if (verseNumber === 0) {
      return null;
    }
    
    const audioMap = await fetchSurahAlKahfAudio();
    return audioMap.get(verseNumber) || null;
  } catch (error) {
    return null;
  }
};

export const clearApiCache = (): void => {
  cachedVerses = null;
  cacheTimestamp = 0;
  cachedAudioData = null;
  audioCacheTimestamp = 0;
  cachedTafseerList = null;
  tafseerListCacheTimestamp = 0;
  cachedTafseerData = null;
  tafseerDataCacheTimestamp = 0;
};

export const fetchTafseerList = async (): Promise<TafseerInfo[]> => {
  if (cachedTafseerList !== null && (Date.now() - tafseerListCacheTimestamp) < CACHE_DURATION) {
    return cachedTafseerList;
  }

  const url = `${TAFSEER_BASE_URL}/tafseer`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: TafseerInfo[] = await response.json();
    
    cachedTafseerList = data;
    tafseerListCacheTimestamp = Date.now();
    
    return data;
  } catch (error) {
    throw new Error('Failed to fetch tafseer list. Please check your connection and try again.');
  }
};

export const fetchVerseTafseer = async (tafseerId: number, surahNumber: number, ayahNumber: number): Promise<TafseerResponse> => {
  const cacheKey = `${tafseerId}-${surahNumber}-${ayahNumber}`;
  
  if (cachedTafseerData === null) {
    cachedTafseerData = new Map();
  }
  
  if (cachedTafseerData.has(cacheKey) && (Date.now() - tafseerDataCacheTimestamp) < CACHE_DURATION) {
    return cachedTafseerData.get(cacheKey)!;
  }

  const url = `${TAFSEER_BASE_URL}/tafseer/${tafseerId}/${surahNumber}/${ayahNumber}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: TafseerResponse = await response.json();
    
    cachedTafseerData.set(cacheKey, data);
    tafseerDataCacheTimestamp = Date.now();
    
    return data;
  } catch (error) {
    throw new Error('Failed to fetch verse tafseer. Please check your connection and try again.');
  }
};

export const getDefaultTafseer = async (ayahNumber: number): Promise<TafseerResponse> => {
  if (ayahNumber === 0) {
    return {
      tafseer_id: 3,
      tafseer_name: "تفسير السعدي",
      ayah_url: "/quran/18/0/",
      ayah_number: 0,
      text: "البسملة: بِسْمِ اللَّهِ، أي أبتدئ بكل اسم لله تعالى، لأن لفظ (اسم) مفرد مضاف، فيعم جميع الأسماء الحسنى. والله هو المألوه المعبود، المستحق لإفراده بالعبادة، لما اتصف به من صفات الألوهية وهي صفات الكمال. الرَّحْمَنِ الرَّحِيمِ اسمان دالان على أنه تعالى ذو الرحمة الواسعة العظيمة التي وسعت كل شيء، وعمت كل حي، وكتبها للمتقين المتبعين لأنبيائه ورسله. فالرحمن دال على الصفة القائمة به سبحانه، والرحيم دال على تعلقها بالمرحوم، فكان الأول دال على جلاله والثاني على جماله وإحسانه."
    };
  }
  
  return await fetchVerseTafseer(3, SURAH_NUMBER, ayahNumber);
};