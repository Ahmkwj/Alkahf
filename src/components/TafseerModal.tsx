import React, { useEffect, useState } from 'react';
import { TafseerResponse, getDefaultTafseer } from '../services/quranApi';

interface TafseerModalProps {
  isOpen: boolean;
  onClose: () => void;
  ayahNumber: number;
  ayahText: string;
}

const TafseerModal: React.FC<TafseerModalProps> = ({ isOpen, onClose, ayahNumber, ayahText }) => {
  const [tafseer, setTafseer] = useState<TafseerResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && ayahNumber) {
      loadTafseer();
    }
  }, [isOpen, ayahNumber]);

  const loadTafseer = async () => {
    try {
      setLoading(true);
      setError(null);
      const tafseerData = await getDefaultTafseer(ayahNumber);
      setTafseer(tafseerData);
    } catch (err) {
      setError('فشل في تحميل التفسير. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-surface border border-border-secondary rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between p-6 border-b border-border-secondary bg-elevated">
          <div className="flex items-center gap-3">
            <div className="bg-accent text-main px-3 py-1.5 rounded-lg font-medium text-sm">
              تفسير آية {ayahNumber}
            </div>
            <h2 className="text-lg font-semibold text-text-primary" style={{ fontFamily: 'IBM Plex Sans Arabic, sans-serif' }}>
              تفسير السعدي
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface rounded-lg transition-colors group"
            title="إغلاق"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-text-muted group-hover:text-text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6 space-y-6">
            <div className="bg-card border border-border-secondary rounded-xl p-6">
              <h3 className="text-accent font-semibold mb-4 text-sm">نص الآية:</h3>
              <p 
                className="text-text-primary text-2xl leading-relaxed text-center"
                style={{ fontFamily: 'IBM Plex Sans Arabic, sans-serif' }}
                dir="rtl"
              >
                {ayahText}
              </p>
            </div>

            <div className="bg-card border border-border-secondary rounded-xl p-6">
              <h3 className="text-accent font-semibold mb-4 text-sm">التفسير:</h3>
              
              {loading && (
                <div className="flex items-center justify-center py-8">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-accent/30 border-t-accent rounded-full animate-spin"></div>
                    <span className="text-text-muted">جاري تحميل التفسير...</span>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-3 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {tafseer && !loading && !error && (
                <div className="space-y-4">
                  <p 
                    className="text-text-primary text-lg leading-loose"
                    style={{ fontFamily: 'IBM Plex Sans Arabic, sans-serif' }}
                    dir="rtl"
                  >
                    {tafseer.text}
                  </p>
                  
                  <div className="pt-4 border-t border-border-secondary">
                    <p className="text-text-muted text-sm" style={{ fontFamily: 'IBM Plex Sans Arabic, sans-serif' }}>
                      {tafseer.tafseer_name}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-start gap-3 pt-4">
              <button
                onClick={onClose}
                className="btn-secondary px-6 py-2.5 mb-2"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TafseerModal; 