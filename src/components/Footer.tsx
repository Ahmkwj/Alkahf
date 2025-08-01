const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card mt-auto">
      <div className="container max-w-5xl mx-auto px-6">
        <div className="py-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-3 text-text-primary">سورة الكهف</h3>
            <p className="text-text-secondary text-sm mb-2">
              موقع مخصص لعرض آيات سورة الكهف
            </p>
            <div className="text-text-muted text-sm">
              <span>سورة مكية • 110 آية • الجزء 15-16</span>
            </div>
          </div>
          
          <div className="border-t border-border-primary my-6"></div>
          
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="text-text-muted text-sm">
              <span>© {currentYear} موقع سورة الكهف</span>
            </div>
            
            <div className="text-center">
              <span className="text-text-secondary text-sm">رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;