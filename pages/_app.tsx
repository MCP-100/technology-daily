import '../styles/globals.css'
import type { AppProps } from 'next/app'
import * as Sentry from "@sentry/nextjs"

// Initialize Sentry
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: process.env.NODE_ENV === 'development',
})

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
} 