import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from '@remix-run/react'
import { Flex, Spacer, styled } from 'styled-system/jsx'

import './styles/index.css'
import { MenuItem, MenuList, Typography } from '@mui/material'
import { css } from '~/styled-system/css'

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
        <Flex minH="screen">
          <NavLink />
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
        <MenuItem selected={pathname === '/'}>
          <Link to="/">
            <Typography variant="h5">Give consent</Typography>
          </Link>
        </MenuItem>

        <MenuItem selected={pathname === '/consents'}>
          <Link to="/consents">
            <Typography variant="h5">Collected consents</Typography>
          </Link>
        </MenuItem>
      </MenuList>
    </styled.nav>
  )
}
