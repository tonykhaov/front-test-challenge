import { Flex, Spacer } from 'styled-system/jsx'
import { addConsentDetails, database, getPaginatedConsents } from '../database.server'
import { Link, useLoaderData, useSearchParams } from '@remix-run/react'
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { css } from '~/styled-system/css'
import { LoaderFunctionArgs, redirect } from '@remix-run/node'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)

  const page = Number(url.searchParams.get('page') || 1)
  const perPage = Number(url.searchParams.get('perPage') || 2)

  const total = database.collectedConsents.length

  const lastPage = Math.ceil(total / perPage)

  if (page < 1) {
    url.searchParams.set('page', '1')
    return redirect(url.toString())
  }
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

  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page') || '1')
  const perPage = searchParams.get('perPage') ?? 2

  const changePageAndPreserveLink = (page: number) => {
    searchParams.set('page', page.toString())
    return '?' + searchParams.toString()
  }

  return (
    <Container>
      <Spacer h="8" />
      <Typography variant="h5">Collected Consents</Typography>

      <Spacer h="4" />

      <FormControl fullWidth>
        <InputLabel>Show items per page</InputLabel>
        <Select
          label="Show items per page"
          value={perPage}
          onChange={(event) =>
            setSearchParams((s) => {
              s.set('perPage', event.target.value.toString())
              return s
            })
          }
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
      </FormControl>

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
              {currentPage !== 1 ? <Link to={changePageAndPreserveLink(currentPage - 1)}>Previous page</Link> : null}
            </TableCell>
            <TableCell colSpan={2}>
              <Flex gap="2" justifyContent="center">
                {Array.from({ length: data.lastPage }).map((_, index) => {
                  const page = index + 1
                  return (
                    <Link
                      relative="path"
                      key={index}
                      to={changePageAndPreserveLink(page)}
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
              {currentPage !== data.lastPage ? (
                <Link to={changePageAndPreserveLink(currentPage + 1)}>Next page</Link>
              ) : null}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Container>
  )
}
