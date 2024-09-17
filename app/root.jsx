import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import styles from '~/styles/main.css'
import MainNavigation from './components/MainNavigation'

export const meta = () => ({
  charset: 'utf-8',
  title: 'New Remix Note Taking App',
  viewport: 'width=device-width,initial-scale=1',
})

export default function App() {
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <MainNavigation />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

// export function Error
export const ErrorBoundary = ({ error }) => (
  <html lang='en'>
    <head>
      <Meta />
      <Links />
      <title>An Error Occurred</title>
    </head>
    <body>
      <MainNavigation />
      <main className='error'>
        <h1>Something Went Wrong!</h1>
        <p>{error.message}</p>
        <p>
          Back to <Link to='/'>safety</Link>
        </p>
      </main>
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
)
