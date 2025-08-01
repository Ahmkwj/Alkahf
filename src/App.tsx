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
      <div className="fixed inset-0 bg-main flex items-center justify-center z-50">
        <div className="text-center relative">
          {/* Logo */}
          <div className="w-20 h-20 mx-auto mb-8 relative">
            <div className="absolute inset-0 bg-accent rounded-full animate-pulse opacity-25"></div>
            <svg className="w-full h-full" viewBox="0 0 64 64" fill="none">
              <circle className="animate-spin-slow" cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" strokeDasharray="1,6" />
              <circle className="animate-spin-reverse" cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="2" strokeDasharray="1,6" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl text-accent font-uthmani">ك</span>
            </div>
          </div>
          
          {/* Text */}
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl text-accent font-light quran-text">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </h2>
            <p className="text-text-secondary text-sm mt-4 opacity-75">
              جاري تحميل سورة الكهف
            </p>
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