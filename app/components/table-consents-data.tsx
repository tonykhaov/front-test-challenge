import { Table, TableHead, TableRow, TableCell, TableBody, TableFooter } from '@mui/material'
import { Link, useSearchParams } from '@remix-run/react'
import { css } from '~/styled-system/css'
import { Flex } from '~/styled-system/jsx'
import { CollectedConsentWithConsentDetails } from '../database.server'

type TableConsentsDataProps = {
  data: CollectedConsentWithConsentDetails[]
  currentPage: number
  lastPage: number
}

export function TableConsentsData({ data, currentPage, lastPage }: TableConsentsDataProps) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Consents given for</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {data.map((consent) => (
          <UserConsentRow key={consent.id} consent={consent} />
        ))}
      </TableBody>

      <TableFooter>
        <Pagination currentPage={currentPage} lastPage={lastPage} />
      </TableFooter>
    </Table>
  )
}

export function UserConsentRow({ consent }: { consent: CollectedConsentWithConsentDetails }) {
  return (
    <TableRow key={consent.id}>
      <TableCell>{consent.name}</TableCell>
      <TableCell>{consent.email}</TableCell>
      {consent.consents.length > 0 ? (
        <TableCell>{consent.consents.map((consent) => consent?.description).join(', ')}</TableCell>
      ) : (
        <TableCell>None</TableCell>
      )}
    </TableRow>
  )
}

export function Pagination({ currentPage, lastPage }: { currentPage: number; lastPage: number }) {
  const [searchParams] = useSearchParams()

  const toNewParams = (page: number) => {
    searchParams.set('page', page.toString())
    return '?' + searchParams.toString()
  }

  return (
    <TableRow>
      <TableCell>{currentPage !== 1 ? <Link to={toNewParams(currentPage - 1)}>Previous page</Link> : null}</TableCell>
      <TableCell colSpan={2}>
        <Flex gap="2" justifyContent="center">
          {Array.from({ length: lastPage }).map((_, index) => {
            const page = index + 1
            return (
              <Link
                relative="path"
                key={index}
                to={toNewParams(page)}
                className={css({
                  fontWeight: currentPage === page ? 'bold' : 'normal',
                  color: currentPage === page ? 'black' : 'inherit',
                  textDecoration: currentPage === page ? 'underline' : 'none',
                })}
              >
                {page}
              </Link>
            )
          })}
        </Flex>
      </TableCell>
      <TableCell>
        {currentPage !== lastPage ? <Link to={toNewParams(currentPage + 1)}>Next page</Link> : null}
      </TableCell>
    </TableRow>
  )
}
