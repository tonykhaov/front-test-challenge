import { Spacer, styled } from 'styled-system/jsx'
import { database } from '../database.server'
import { useLoaderData } from '@remix-run/react'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

export const loader = async () => {
  const consentsList = database.consentsList

  const consents = database.givenConsents.map((givenConsent) => {
    const enabledConsents = givenConsent.consents.filter((consent) => consent.enabled)
    const consentsWithDescription = enabledConsents.map((consent) => ({
      id: consent.id,
      enabled: consent.enabled,
      ...consentsList.find((c) => c.id === consent.id),
    }))

    return {
      id: givenConsent.id,
      name: givenConsent.name,
      email: givenConsent.email,
      consents: consentsWithDescription,
    }
  })

  return { consents }
}
export default function ConsentsPage() {
  const data = useLoaderData<typeof loader>()

  return (
    <styled.div>
      <Spacer h="12" />
      <h1>Collected Consents</h1>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Consents given for</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.consents.map((givenConsent) => (
            <TableRow key={givenConsent.id}>
              <TableCell>{givenConsent.name}</TableCell>
              <TableCell>{givenConsent.email}</TableCell>
              {givenConsent.consents.length > 0 ? (
                <TableCell>{givenConsent.consents.map((consent) => consent.description).join(', ')}</TableCell>
              ) : (
                <TableCell>None</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </styled.div>
  )
}
