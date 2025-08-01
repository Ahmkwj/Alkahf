# Al-Kahf | سورة الكهف

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.1-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.15-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![ESLint](https://img.shields.io/badge/ESLint-9.13.0-4B32C3?style=flat&logo=eslint&logoColor=white)](https://eslint.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, elegant web application for reading and exploring Surah Al-Kahf (Chapter 18) of the Holy Quran. This application provides a beautiful interface for studying the verses with authentic Arabic text and English translations.

---

## Features

### User Experience
- **Responsive Design** — Seamless experience across desktop and mobile devices
- **Multiple Themes** — Dark, Light, and Sepia themes for comfortable reading
- **Typography Controls** — Adjustable font sizes with 10 levels of customization
- **Intuitive Navigation** — Click any verse to reveal detailed information

### Content & Search
- **Bilingual Support** — Authentic Arabic text with English translations
- **Advanced Search** — Search through verses in both Arabic and English
- **Diacritics Support** — Search works with or without Arabic diacritics
- **Comprehensive Filters** — Search by verse number, page, or Juz (part)

### Technical Excellence
- **Offline-First** — Intelligent caching for improved performance
- **RTL Support** — Full right-to-left language support for Arabic
- **Modern Architecture** — Built with latest React and TypeScript
- **Optimized Performance** — Fast loading and smooth interactions

---

## Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** version 18 or higher
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/username/alkahf.git
   cd alkahf
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open application**
   
   Navigate to `http://localhost:5173` in your browser

---

## Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |
| `npm run lint:fix` | Automatically fix ESLint issues |
| `npm run type-check` | Run TypeScript type checking |

### Project Architecture

```
alkahf/
├── src/
│   ├── components/
│   │   ├── Header.tsx           # Application header component
│   │   ├── SurahText.tsx        # Main content and verse display
│   │   └── Footer.tsx           # Application footer component
│   │
│   ├── services/
│   │   └── quranApi.ts          # API integration and caching logic
│   │
│   ├── assets/
│   │   └── UthmanTNB_v2-0.ttf   # Authentic Arabic Uthmani font
│   │
│   ├── App.tsx                  # Root application component
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles and theme system
│
├── public/                      # Static assets and favicon
├── dist/                        # Production build output
└── docs/                        # Documentation files
```

---

## Technical Stack

### Frontend Technologies
- **React 18** — Modern React with hooks and concurrent features
- **TypeScript** — Static typing for enhanced developer experience
- **Tailwind CSS** — Utility-first CSS framework with custom design system

### Build & Development Tools
- **Vite** — Fast build tool with hot module replacement
- **ESLint** — Code linting with React-specific rules
- **PostCSS** — CSS processing with Autoprefixer

### External Services
- **Al-Quran Cloud API** — Reliable source for Quranic text and metadata

---

## Theme System

The application features three carefully crafted themes:

**Dark Theme**
- Primary theme with deep blacks and blue accents
- Optimized for low-light reading conditions

**Light Theme**
- Clean, bright interface for daytime use
- High contrast for excellent readability

**Sepia Theme**
- Warm, book-like appearance
- Reduces eye strain during extended reading sessions

We welcome contributions from the community. Please read our contributing guidelines before submitting pull requests.

### Development Guidelines

1. **Code Quality**
   - Follow TypeScript best practices
   - Maintain existing code style and structure
   - Ensure all tests pass before submitting

2. **Documentation**
   - Update README for new features
   - Include clear commit messages
   - Document any breaking changes

3. **Testing**
   - Test changes across different browsers
   - Verify responsive design on mobile devices
   - Ensure theme switching works correctly

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for complete details.

---

## Support

### Getting Help

- **Issues** — Report bugs or request features via [GitHub Issues](https://github.com/username/alkahf/issues)
- **Documentation** — Check existing documentation for common questions
- **Community** — Engage with other users and contributors

### Contact

For questions, suggestions, or collaboration opportunities, please open an issue on GitHub.