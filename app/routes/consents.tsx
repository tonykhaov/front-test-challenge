import { Spacer } from 'styled-system/jsx'
import { addConsentDetails, database, getPaginatedConsents } from '../database'
import { ClientLoaderFunctionArgs, useLoaderData, useSearchParams, redirect } from '@remix-run/react'
import { Container, Typography } from '@mui/material'
import { SelectPerPage } from '../components/select-per-page'
import { TableConsentsData } from '../components/table-consents-data'

export default function ConsentsPage() {
  const data = useLoaderData<typeof clientLoader>()

  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page') || '1')
  const perPage = searchParams.get('perPage') ?? PER_PAGE

  const updatePerPage = (perPage: number) => {
    setSearchParams((s) => {
      s.set('perPage', perPage.toString())
      return s
    })
  }

  return (
    <Container>
      <Spacer h="8" />
      <Typography variant="h5">Collected Consents</Typography>

      <Spacer h="4" />

      <SelectPerPage value={Number(perPage)} onChange={(event) => updatePerPage(Number(event.target.value))} />

      <TableConsentsData data={data.consents} currentPage={currentPage} lastPage={data.lastPage} />
    </Container>
  )
}

const PER_PAGE = 2

export const clientLoader = async ({ request }: ClientLoaderFunctionArgs) => {
  const url = new URL(request.url)

  const page = Number(url.searchParams.get('page') || 1)
  const perPage = Number(url.searchParams.get('perPage') || PER_PAGE)

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
