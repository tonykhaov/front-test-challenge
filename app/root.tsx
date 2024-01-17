import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import { Flex, styled } from 'styled-system/jsx'

import './styles/index.css'

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Flex>
          <styled.nav minWidth="48">
            <Link to="/">
              <styled.h1 fontSize="xl">Give consent</styled.h1>
            </Link>
            <Link to="/consents">
              <styled.h1 fontSize="xl">Collected consents</styled.h1>
            </Link>
          </styled.nav>
          <styled.div flex="1">
            <Outlet />
          </styled.div>
        </Flex>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
