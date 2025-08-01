const Header: React.FC = () => {
  return (
    <header className="header-container sticky top-0 z-40">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center fade-in">
          <div className="w-full py-4 sm:py-6">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary quran-text">سُورَةُ الْكَهْفِ</h1>
              <p className="text-sm sm:text-base text-text-muted mt-2 sm:mt-3 font-medium">110 آية • مكية</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;