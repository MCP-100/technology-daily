# Technology Daily News Reader

A modern technology news reading platform built with Next.js.

## Project Overview

Technology Daily News Reader is a technology news reading platform built with Next.js and React, integrating multiple modern features:

- Technology news display and reading
- AI tools showcase and analysis 
- Dark mode support
- Export articles as images
- Sentry error monitoring
- Responsive design

## Tech Stack

- **Frontend Framework**: Next.js 14.0.0
- **UI Framework**: React 18.2.0
- **Styling Solution**: 
  - Tailwind CSS
  - @tailwindcss/typography
  - @tailwindcss/line-clamp
- **Type System**: TypeScript
- **Error Monitoring**: Sentry
- **Utility Libraries**:
  - @heroicons/react - Icon library
  - html-to-image - Image generation
  - marked - Markdown rendering

## Main Features

### 1. News Reading
- Markdown format support
- Responsive layout
- Dark mode toggle
- Export articles as images

### 2. AI Tools Showcase
- AI tools list display
- Tool details introduction
- Category display

### 3. Error Monitoring
- Sentry integration
- Error tracking
- Performance monitoring
- User session replay

## Project Structure
├── components/ # React components
│ └── AIToolsList.tsx # AI tools list component
├── pages/ # Next.js pages
│ ├── api/ # API routes
│ ├── app.tsx # Application entry
│ ├── index.tsx # Homepage
│ └── ai-tools.tsx # AI tools page
├── styles/ # Style files
│ └── globals.css # Global styles
├── data/ # Data files
│ └── aiTools.ts # AI tools data
├── public/ # Static assets
└── sentry.config.ts # Sentry configuration file


## Development Environment Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd technology-daily
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
- Copy `.env.example` to `.env.local`
- Set the required environment variables:
  ```
  NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
  ```

4. Start the development server:
```bash
npm run dev
```

Now you can visit http://localhost:3000 to view the project.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run code linting

## Sentry Integration

The project uses Sentry for error monitoring and performance tracking, with the following configurations:

- `sentry.client.config.ts` - Client-side configuration
- `sentry.server.config.ts` - Server-side configuration
- `sentry.edge.config.ts` - Edge runtime configuration

Key features:
- Error tracking
- Performance monitoring
- User session replay
- Automated monitoring

## Deployment

The project can be deployed to any platform that supports Next.js. We recommend using Vercel:

1. Import your project to Vercel
2. Configure environment variables
3. Deploy

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

ISC License