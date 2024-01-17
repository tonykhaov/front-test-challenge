import { Spacer } from 'styled-system/jsx'
import { addConsentDetails, database, getPaginatedConsents } from '../database.server'
import { useLoaderData, useSearchParams } from '@remix-run/react'
import { Container, Typography } from '@mui/material'
import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { SelectPerPage } from '../components/select-per-page'
import { TableConsentsData } from '../components/table-consents-data'

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
