import { useState, useEffect } from 'react';
import Header from './components/Header';
import SurahText from './components/SurahText';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-main flex items-center justify-center z-50 px-4">
        <div className="text-center">
          <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 mb-8">
            <div className="absolute inset-0 border-2 border-accent/20 rounded-full"></div>
            <div className="absolute inset-0 border-2 border-accent rounded-full animate-spin-slow"
                 style={{ clipPath: 'inset(0 0 50% 50%)' }}>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl sm:text-3xl text-accent" style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>ك</span>
            </div>
          </div>

          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl sm:text-2xl text-accent font-light">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </h2>
            <div className="space-y-2">
              <p className="text-text-secondary text-sm sm:text-base opacity-75 mb-4">
                جاري تحميل سورة الكهف
              </p>
              <div className="flex items-center justify-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col animate-fade-in bg-main">
      <Header />
      <main className="flex-1">
        <SurahText />
      </main>
      <Footer />
    </div>
  );
}

export default App;