import { useState, useEffect } from 'react';
import { fetchSurahAlKahfComplete } from '../services/quranApi';
import type { ProcessedVerse } from '../services/quranApi';

type Theme = 'dark' | 'light' | 'sepia';

const SurahText: React.FC = () => {
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [verses, setVerses] = useState<ProcessedVerse[]>([]);
  const [filteredVerses, setFilteredVerses] = useState<ProcessedVerse[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fontSizeLevel, setFontSizeLevel] = useState(5);
  const [currentTheme, setCurrentTheme] = useState<Theme>('dark');

  const getFontSize = (level: number) => {
    return 1.2 + (level - 1) * 0.15;
  };

  const increaseFontSize = () => setFontSizeLevel(prev => Math.min(prev + 1, 10));
  const decreaseFontSize = () => setFontSizeLevel(prev => Math.max(prev - 1, 1));
  const resetFontSize = () => setFontSizeLevel(5);

  const changeTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    document.documentElement.className = theme;
  };

  useEffect(() => {
    document.documentElement.className = currentTheme;
  }, [currentTheme]);

  useEffect(() => {
    const loadAllVerses = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedVerses = await fetchSurahAlKahfComplete();
        setVerses(fetchedVerses);
        setFilteredVerses(fetchedVerses);
      } catch {
        setError('فشل في تحميل آيات سورة الكهف. يرجى المحاولة مرة أخرى.');
      } finally {
        setLoading(false);
      }
    };

    loadAllVerses();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredVerses(verses);
      return;
    }

    const query = searchQuery.trim();
    const queryLower = query.toLowerCase();
    
    const filtered = verses.filter(verse => {
      const arabicMatch = verse.arabic.includes(query);
      const translationMatch = verse.translation.toLowerCase().includes(queryLower);
      const verseNumberMatch = verse.numberInSurah.toString().includes(query);
      const pageMatch = verse.page.toString().includes(query);
      const juzMatch = verse.juz.toString().includes(query);
      
      const arabicWithoutDiacritics = verse.arabic.replace(/[\u064B-\u065F\u0670\u0640]/g, '');
      const queryWithoutDiacritics = query.replace(/[\u064B-\u065F\u0670\u0640]/g, '');
      const arabicNoDiacriticsMatch = arabicWithoutDiacritics.includes(queryWithoutDiacritics);
      
      return arabicMatch || translationMatch || verseNumberMatch || pageMatch || juzMatch || arabicNoDiacriticsMatch;
    });
    
    setFilteredVerses(filtered);
  }, [searchQuery, verses]);

  const currentFontSize = getFontSize(fontSizeLevel);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-main px-4">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4 sm:mb-6"></div>
          <h3 className="text-lg sm:text-xl text-accent mb-2 font-uthmani">جاري تحميل سورة الكهف</h3>
          <p className="text-text-secondary text-sm">يرجى الانتظار...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 sm:py-16 bg-main">
        <div className="container max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="bg-red-950/30 rounded-modern p-6 sm:p-8">
              <h3 className="text-red-400 text-base sm:text-lg mb-3 sm:mb-4 font-semibold">خطأ في التحميل</h3>
              <p className="text-red-300 mb-4 sm:mb-6 text-sm sm:text-base">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="btn-primary text-sm sm:text-base"
              >
                المحاولة مرة أخرى
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-16 min-h-screen bg-main">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-surface rounded-xl p-3 sm:p-4 mb-6 sm:mb-8">
          {/* Mobile Layout */}
          <div className="block sm:hidden space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في الآيات..."
                className="w-full bg-content text-text-primary rounded-lg px-10 py-2.5 focus:outline-none focus:ring-1 focus:ring-accent text-right text-sm"
                dir="rtl"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary p-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Controls Row */}
            <div className="flex flex-col gap-4">
              {/* Theme Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-text-secondary text-xs font-medium">المظهر</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => changeTheme('dark')}
                      className={`theme-button-mobile ${currentTheme === 'dark' ? 'active' : ''}`}
                      title="المظهر المظلم"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => changeTheme('light')}
                      className={`theme-button-mobile ${currentTheme === 'light' ? 'active' : ''}`}
                      title="المظهر الفاتح"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => changeTheme('sepia')}
                      className={`theme-button-mobile ${currentTheme === 'sepia' ? 'active' : ''}`}
                      title="المظهر الدافئ"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Font Size Controls */}
                <div className="flex items-center gap-2">
                  <span className="text-text-secondary text-xs font-medium">الخط</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={decreaseFontSize}
                      className="theme-button-mobile"
                      title="تصغير الخط"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <div className="theme-button-mobile flex items-center justify-center font-medium">
                      {fontSizeLevel}
                    </div>
                    <button
                      onClick={increaseFontSize}
                      className="theme-button-mobile"
                      title="تكبير الخط"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex items-center justify-between gap-6">
            <div className="flex-1 max-w-[500px] min-w-[200px] transition-all duration-300">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث في الآيات..."
                  className="w-full bg-content text-text-primary rounded-lg px-10 py-2 focus:outline-none focus:ring-1 focus:ring-accent text-right"
                  dir="rtl"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary p-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 border-r border-border-primary pr-6">
              <span className="text-text-secondary font-medium">المظهر</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => changeTheme('dark')}
                  className={`theme-button ${currentTheme === 'dark' ? 'active' : ''}`}
                  title="المظهر المظلم"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </button>
                <button
                  onClick={() => changeTheme('light')}
                  className={`theme-button ${currentTheme === 'light' ? 'active' : ''}`}
                  title="المظهر الفاتح"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </button>
                <button
                  onClick={() => changeTheme('sepia')}
                  className={`theme-button ${currentTheme === 'sepia' ? 'active' : ''}`}
                  title="المظهر الدافئ"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 border-r border-border-primary pr-6">
              <span className="text-text-secondary font-medium">حجم الخط</span>
              <button
                onClick={decreaseFontSize}
                className="font-size-button"
                title="تصغير الخط"
              >
                -
              </button>
              <div className="font-size-value">
                {fontSizeLevel}
              </div>
              <button
                onClick={increaseFontSize}
                className="font-size-button"
                title="تكبير الخط"
              >
                +
              </button>
              <button
                onClick={resetFontSize}
                className="font-size-reset"
                title="إعادة تعيين حجم الخط"
              >
                إعادة تعيين
              </button>
            </div>
          </div>
        </div>

        {searchQuery && (
          <div className="bg-surface/50 rounded-lg py-3 px-3 sm:px-4 mb-6 sm:mb-8 text-right">
            {filteredVerses.length > 0 ? (
              <div className="text-xs sm:text-sm text-text-secondary">
                تم العثور على <span className="text-accent font-medium">{filteredVerses.length}</span> آية من أصل <span className="text-text-primary">{verses.length}</span>
              </div>
            ) : (
              <div className="text-xs sm:text-sm text-text-muted">
                لا توجد نتائج للبحث "<span className="text-text-secondary">{searchQuery}</span>"
              </div>
            )}
          </div>
        )}

        <div className="space-y-6 sm:space-y-8">
          {filteredVerses.map((verse, index) => (
            <div 
              key={verse.numberInSurah}
              className={`verse-card p-4 sm:p-8 fade-in cursor-pointer ${
                selectedVerse === verse.numberInSurah ? 'selected' : ''
              }`}
              style={{ animationDelay: `${Math.min(index * 0.01, 0.5)}s` }}
              onClick={() => setSelectedVerse(selectedVerse === verse.numberInSurah ? null : verse.numberInSurah)}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div>
                    <div className="bg-accent text-[var(--color-badge-text)] px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg font-medium text-xs sm:text-sm transition-colors">
                      آية {verse.numberInSurah}
                    </div>
                  </div>
                </div>
                
                <div className="text-xs sm:text-sm text-text-muted">
                  ص {verse.page} • ج {verse.juz}
                </div>
              </div>

              <div className="verse-content-mobile sm:verse-content">
                <div 
                  className="quran-text text-text-primary leading-loose text-center"
                  style={{ 
                    fontSize: `${currentFontSize}rem`,
                    lineHeight: 2.4,
                    letterSpacing: '0.02em'
                  }}
                >
                  {verse.arabic}
                </div>
              </div>
              
              {selectedVerse === verse.numberInSurah && (
                <div className="fade-in mt-6 sm:mt-8">
                  <div className="translation-panel-mobile sm:translation-panel">
                    <div className="mb-4 sm:mb-6">
                      <h4 className="text-accent font-semibold mb-3 sm:mb-4 text-left text-sm sm:text-base" dir="ltr">English Translation:</h4>
                      <p className="text-text-primary leading-relaxed text-sm sm:text-lg text-left" dir="ltr" lang="en">{verse.translation}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                      <div className="info-badge-mobile sm:info-badge text-center">
                        <div className="info-badge-label-mobile sm:info-badge-label">رقم الآية</div>
                        <div className="info-badge-value-mobile sm:info-badge-value">{verse.numberInSurah}/{verses.length}</div>
                      </div>
                      <div className="info-badge-mobile sm:info-badge text-center">
                        <div className="info-badge-label-mobile sm:info-badge-label">في المصحف</div>
                        <div className="info-badge-value-mobile sm:info-badge-value">{verse.number}</div>
                      </div>
                      <div className="info-badge-mobile sm:info-badge text-center">
                        <div className="info-badge-label-mobile sm:info-badge-label">الصفحة</div>
                        <div className="info-badge-value-mobile sm:info-badge-value">{verse.page}</div>
                      </div>
                      <div className="info-badge-mobile sm:info-badge text-center">
                        <div className="info-badge-label-mobile sm:info-badge-label">الجزء</div>
                        <div className="info-badge-value-mobile sm:info-badge-value">{verse.juz}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SurahText; 