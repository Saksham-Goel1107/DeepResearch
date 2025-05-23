# Deep Research AI Assistant 🔍

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![OpenRouter](https://img.shields.io/badge/AI-OpenRouter-purple)](https://openrouter.ai/)

An AI-powered research assistant that helps you explore topics deeply and generate comprehensive reports. Built with Next.js, TypeScript, and OpenRouter API.

![Research Process](app%20screenshots/Researching.png)
![Final Report](app%20screenshots/Final%20output%20with%20report.png)

## Features 🚀

- **Interactive Topic Exploration**: Start with a topic and answer clarifying questions to focus your research
- **AI-Powered Research**: Automated research process using advanced language models
- **Real-time Progress Tracking**: Watch as the AI conducts research and analyzes information
- **Comprehensive Reports**: Get well-structured, Word-compatible HTML reports
- **Beautiful UI**: Modern, responsive interface with a clean design
- **Source Attribution**: Transparent sourcing with references and citations

## Tech Stack 💻

- **Frontend**: Next.js 15, React, TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS, Shadcn/ui
- **AI Integration**: OpenRouter API
- **Development Tools**: ESLint, PostCSS

## Getting Started 🌟

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenRouter API key

### Installation

1. Clone the repository
```powershell
git clone https://github.com/Saksham-Goel1107/DeepResearch.git
cd DeepResearch
```

2. Install dependencies
```powershell
npm install
```

3. Set up environment variables
Create a `.env.local` file in the root directory:
```env
OPENROUTER_API_KEY=your_api_key_here
EXA_SEARCH_API_KEY=your_api_key_here
```

4. Start the development server
```powershell
npm run dev
```

The application will be available at `http://localhost:3000`.

## Usage 📚

1. Enter your research topic in the main input field
2. Answer the clarifying questions to help focus the research
3. Watch as the AI conducts research in real-time
4. Review the generated report
5. Download the report in Word-compatible HTML format

## Project Structure 📁

- `/src/app` - Next.js application routes and API endpoints
- `/src/components` - React components including UI elements
- `/src/store` - Zustand store for state management
- `/src/lib` - Utility functions and helpers

## Contributing 🤝

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

Please ensure your code follows the existing style and includes appropriate tests.

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author ✨

**Saksham Goel**
- GitHub: [@Saksham-Goel1107](https://github.com/Saksham-Goel1107)

## Acknowledgments 🙏

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- AI powered by [OpenRouter](https://openrouter.ai/)