import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card mt-auto">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        <div className="py-6 sm:py-8">
          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-text-primary">سورة الكهف</h3>
            <p className="text-text-secondary text-xs sm:text-sm mb-2">
              موقع مخصص لعرض آيات سورة الكهف
            </p>
            <div className="text-text-muted text-xs sm:text-sm">
              <span>سورة مكية • 110 آية • الجزء 15-16</span>
            </div>
          </div>
          
          <div className="border-t border-border-primary my-4 sm:my-6"></div>
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
            <div className="text-text-muted text-xs sm:text-sm text-center sm:text-left">
              <span>© {currentYear} موقع سورة الكهف</span>
            </div>
            
            <div className="text-center">
              <span className="text-text-secondary text-xs sm:text-sm leading-relaxed">رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;