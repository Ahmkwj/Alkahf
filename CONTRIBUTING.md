# Contributing to Alkahf

We welcome contributions to Alkahf! This document provides guidelines for contributing to this project.

## Code of Conduct

This project adheres to a code of conduct that we expect all contributors to follow. By participating, you are expected to uphold this code:

- Be respectful and inclusive
- Use welcoming and inclusive language
- Be collaborative
- Focus on what is best for the community
- Show empathy towards other community members

## How to Contribute

### Reporting Issues

If you find a bug or have a suggestion for improvement:

1. Check if the issue already exists in the [Issues](https://github.com/your-username/alkahf/issues) section
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser and OS information

### Submitting Changes

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/alkahf.git
   cd alkahf
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add or update tests if necessary
   - Update documentation if needed

4. **Test your changes**
   ```bash
   npm install
   npm run dev
   npm run build
   npm run lint
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add amazing feature"
   ```
   
   Use descriptive commit messages following this format:
   - `feat: add new feature`
   - `fix: resolve issue with...`
   - `docs: update documentation`
   - `style: improve styling for...`
   - `refactor: restructure component`
   - `test: add tests for...`

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template with:
     - Description of changes
     - Motivation and context
     - Testing performed
     - Screenshots (if applicable)

## Development Guidelines

### Code Style

- **TypeScript**: Use TypeScript for all new code
- **Components**: Use functional components with hooks
- **Naming**: Use PascalCase for components, camelCase for functions/variables
- **CSS**: Use Tailwind CSS classes, custom CSS only when necessary
- **Comments**: Write clear, concise comments for complex logic

### Project Structure

```
src/
├── components/     # React components
├── services/       # API services and utilities
├── assets/         # Static assets (fonts, images)
├── App.tsx         # Main app component
├── main.tsx        # Entry point
└── index.css       # Global styles and theme system
```

### API Integration

- Use the existing caching system in `services/quranApi.ts`
- Handle errors gracefully with user-friendly messages
- Follow the established pattern for API calls

### Theme System

- Use CSS variables for colors (defined in `index.css`)
- Ensure new components work with all three themes (dark, light, sepia)
- Test theme switching functionality

### Arabic Text and RTL Support

- Maintain proper RTL layout for Arabic content
- Use LTR for English translations only
- Respect the sacred nature of Quranic text
- Use appropriate fonts (Uthmani for Quran, IBM Plex Sans Arabic for UI)

## Areas for Contribution

### High Priority
- **Accessibility improvements**: ARIA labels, keyboard navigation, screen reader support
- **Performance optimization**: Code splitting, lazy loading, bundle size reduction
- **Mobile responsiveness**: Touch interactions, responsive design improvements
- **Testing**: Unit tests, integration tests, end-to-end tests

### Medium Priority
- **New translations**: Additional language support
- **Search enhancements**: Better search algorithms, search highlighting
- **UI/UX improvements**: Animation refinements, micro-interactions
- **PWA features**: Offline support, service workers

### Low Priority
- **Additional themes**: New color schemes
- **Export features**: PDF generation, verse sharing
- **Audio integration**: Recitation playback
- **Bookmarking**: Save favorite verses

## Technical Requirements

### Prerequisites
- Node.js 16.0 or higher
- npm 7.0 or higher
- Modern browser with ES6+ support

### Dependencies
- React 18+ with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- ESLint for code quality

## Review Process

1. **Automated checks**: All PRs must pass:
   - TypeScript compilation
   - ESLint checks
   - Build process
   - Basic functionality tests

2. **Code review**: At least one maintainer will review:
   - Code quality and style
   - Functionality and logic
   - Performance implications
   - Accessibility considerations

3. **Testing**: Contributors should test:
   - All three themes (dark, light, sepia)
   - Different screen sizes
   - Basic functionality across browsers
   - RTL layout correctness

## Getting Help

- **Documentation**: Check the README.md for setup instructions
- **Issues**: Browse existing issues for solutions
- **Discussions**: Use GitHub Discussions for questions
- **Contact**: Reach out to maintainers for urgent matters

## Recognition

Contributors will be:
- Listed in the project's contributors section
- Mentioned in release notes for significant contributions
- Invited to join the maintainers team for consistent, high-quality contributions

## Islamic Considerations

When contributing to this Islamic project:

- **Respect**: Maintain the sanctity and respect for Quranic content
- **Accuracy**: Ensure accuracy in Islamic text and translations
- **Purpose**: Keep the project's spiritual purpose in mind
- **Community**: Foster a welcoming environment for Muslims and non-Muslims alike

## License

By contributing to Alkahf, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Alkahf! May your efforts be rewarded and benefit the Muslim community worldwide. 