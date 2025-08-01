# Al-Kahf | سورة الكهف

A modern, beautiful web application for reading and exploring Surah Al-Kahf (Chapter 18) of the Holy Quran. This application provides an elegant interface for studying the verses with both Arabic text and English translations.

## ✨ Features

- **Beautiful UI**: Modern, responsive design with three theme options (Dark, Light, Sepia)
- **Bilingual Support**: Arabic text with English translations
- **Advanced Search**: Search through verses in both Arabic and English
- **Typography Controls**: Adjustable font sizes for comfortable reading
- **Verse Navigation**: Click on any verse to view detailed information
- **Offline-First**: Caching for improved performance
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **RTL Support**: Full right-to-left language support for Arabic

## 🚀 Quick Start

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ahmkwj/alkahf.git
cd alkahf
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run type-check` - Run TypeScript type checking

### Project Structure

```
alkahf/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx       # Application header
│   │   ├── SurahText.tsx    # Main content component
│   │   └── Footer.tsx       # Application footer
│   ├── services/            # API services
│   │   └── quranApi.ts      # Quran API integration
│   ├── assets/              # Static assets
│   │   └── UthmanTNB_v2-0.ttf # Arabic font
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles and themes
├── public/                  # Public assets
└── dist/                    # Production build (generated)
```

## 🎨 Themes

The application supports three beautiful themes:

- **Dark Theme**: Default dark mode with blue accents
- **Light Theme**: Clean light mode for daytime reading
- **Sepia Theme**: Warm, book-like theme for comfortable reading

## 📱 Features in Detail

### Search Functionality
- Search in Arabic text (with or without diacritics)
- Search in English translations
- Search by verse number, page, or Juz (part)
- Real-time search results with highlighting

### Typography Controls
- 10 font size levels for Arabic text
- Optimized for readability with proper line spacing
- Uses authentic Uthmani script font

### Verse Information
Click on any verse to view:
- Verse number within the Surah
- Global verse number in the Quran
- Page number in the Mushaf
- Juz (part) number
- English translation

## 🔧 Technical Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite
- **Linting**: ESLint with React-specific rules
- **API**: Al-Quran Cloud API for verse data
- **Font**: Uthmani font for authentic Arabic text rendering

## 🌐 API Integration

The application uses the [Al-Quran Cloud API](https://alquran.cloud/api) to fetch:
- Arabic text from `quran-simple-enhanced` edition
- English translations from `en.sahih` edition
- Verse metadata including page and Juz information

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Guidelines

1. Follow the existing code style and structure
2. Use TypeScript for type safety
3. Write clean, readable code with proper error handling
4. Test your changes thoroughly
5. Update documentation when necessary

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Al-Quran Cloud API for providing the Quranic text and translations
- The Islamic community for inspiration and guidance
- Contributors and users who help improve this application

## 📞 Support

If you encounter any issues or have questions:
- Open an [issue](https://github.com/ahmkwj/alkahf/issues)
- Check existing issues for solutions
- Review the documentation

---

**"And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose."** - Quran 65:3

Made with ❤️ for the Muslim community