import { Flex, Spacer } from 'styled-system/jsx'
import { addConsentDetails, database, getPaginatedConsents } from '../database.server'
import { Link, useLoaderData, useSearchParams } from '@remix-run/react'
import { Container, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, Typography } from '@mui/material'
import { css } from '~/styled-system/css'
import { LoaderFunctionArgs, redirect } from '@remix-run/node'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)

  const page = Number(url.searchParams.get('page') || 1)
  const perPage = Number(url.searchParams.get('perPage') || 2)

  const total = database.collectedConsents.length

  const lastPage = Math.ceil(total / perPage)

  if (page > lastPage) {
    url.searchParams.set('page', String(lastPage))
    return redirect(url.toString())
  }

  const paginated = getPaginatedConsents(page, perPage)
  const consents = addConsentDetails(paginated)

  return { consents, total, lastPage }
}
export default function ConsentsPage() {
  const data = useLoaderData<typeof loader>()

  const [searchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page') || '1')

  return (
    <Container>
      <Spacer h="8" />
      <Typography variant="h5">Collected Consents</Typography>

      <Spacer h="4" />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Consents given for</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.consents.map((collectedConsent) => (
            <TableRow key={collectedConsent.id}>
              <TableCell>{collectedConsent.name}</TableCell>
              <TableCell>{collectedConsent.email}</TableCell>
              {collectedConsent.consents.length > 0 ? (
                <TableCell>{collectedConsent.consents.map((consent) => consent.description).join(', ')}</TableCell>
              ) : (
                <TableCell>None</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>
              {currentPage !== 1 ? <Link to={`?page=${currentPage - 1}`}>Previous page</Link> : null}
            </TableCell>
            <TableCell colSpan={2}>
              <Flex gap="2" justifyContent="center">
                {Array.from({ length: data.lastPage }).map((_, index) => {
                  const page = index + 1
                  return (
                    <Link
                      key={index}
                      to={`?page=${page}`}
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
              {currentPage !== data.lastPage ? <Link to={`?page=${currentPage + 1}`}>Next page</Link> : null}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Container>
  )
}
