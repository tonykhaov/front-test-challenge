import { mockCollectedConsents } from './mock/data'

export type CollectedConsent = {
  id: string
  name: string
  email: string
  consents: Array<UserConsent>
}

export type UserConsent = {
  id: Consent['id']
  enabled: boolean
}

export type Consent = {
  id: string
  name: string
  description: string
}

export const database: {
  collectedConsents: Array<CollectedConsent>
  consentsList: Array<Consent>
} = {
  collectedConsents: mockCollectedConsents,
  consentsList: [
    {
      id: '1',
      name: 'Receive newsletter',
      description: 'Receive newsletter from us',
    },
    {
      id: '2',
      name: 'Be shown targeted ads',
      description: 'Be shown targeted ads from our partners',
    },
    {
      id: '3',
      name: 'Contribute to anonymous visit statistics',
      description: 'Contribute to anonymous visit statistics',
    },
  ],
}

export function addConsentDetails(consents: Array<CollectedConsent>) {
  return consents.map((consent) => {
    const consentsWithDetails = consent.consents.map((userConsent) => {
      const consentDetails = database.consentsList.find((consent) => consent.id === userConsent.id)
      return {
        ...userConsent,
        name: consentDetails?.name,
        description: consentDetails?.description,
      }
    })
    return {
      ...consent,
      consents: consentsWithDetails,
    }
  })
}

export const getPaginatedConsents = (page: number, pageSize: number) => {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return database.collectedConsents.slice(start, end)
}
