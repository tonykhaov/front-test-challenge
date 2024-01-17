import * as React from 'react'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLocation, Link } from '@remix-run/react'
import { withEmotionCache } from '@emotion/react'
import theme from './src/theme'
import ClientStyleContext from './src/ClientStyleContext'
import { Flex, Spacer, styled } from 'styled-system/jsx'
import { MenuItem, MenuList, Typography, unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material'

import './styles/index.css'
import { css } from '~/styled-system/css'

interface DocumentProps {
  children: React.ReactNode
  title?: string
}

const Document = withEmotionCache(({ children, title }: DocumentProps, emotionCache) => {
  const clientStyleData = React.useContext(ClientStyleContext)

  // Only executed on client
  useEnhancedEffect(() => {
    // re-link sheet container
    emotionCache.sheet.container = document.head
    // re-inject tags
    const tags = emotionCache.sheet.tags
    emotionCache.sheet.flush()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tags.forEach((tag) => (emotionCache.sheet as any)._insertTag(tag))
    // reset cache to reapply global styles
    clientStyleData.reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content={theme.palette.primary.main} />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
        />
        <meta name="emotion-insertion-point" content="emotion-insertion-point" />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
})

export default function App() {
  return (
    <Document>
      <Flex minH="screen">
        <NavLink />
        <styled.div flex="1">
          <Outlet />
        </styled.div>
      </Flex>
    </Document>
  )
}

function NavLink() {
  const { pathname } = useLocation()
  return (
    <styled.nav w="max-content" bg="gray.100">
      <Spacer h="2" />

      <MenuList
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '2',
        })}
      >
        <Link to="/">
          <MenuItem selected={pathname === '/'}>
            <Typography variant="h5">Give consent</Typography>
          </MenuItem>
        </Link>

        <Link to="/consents">
          <MenuItem selected={pathname === '/consents'}>
            <Typography variant="h5">Collected consents</Typography>
          </MenuItem>
        </Link>
      </MenuList>
    </styled.nav>
  )
}
