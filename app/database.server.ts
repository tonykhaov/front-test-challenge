import { mockCollectedConsents } from './mock/data'
import { CollectedConsent, Consent, CollectedConsentWithConsentDetails } from './types'

type Database = {
  collectedConsents: Array<CollectedConsent>
  consentsList: Array<Consent>
}

export const database: Database = {
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

export function addConsentDetails(consents: Array<CollectedConsent>): CollectedConsentWithConsentDetails[] {
  return consents.map((consent) => {
    const consentsWithDetails = consent.consents.map((userConsent) => {
      const consentDetails = database.consentsList.find((consent) => consent.id === userConsent.id)

      return {
        id: userConsent.id,
        enabled: userConsent.enabled,
        name: consentDetails?.name,
        description: consentDetails?.description,
      }
    })

    return {
      id: consent.id,
      name: consent.name,
      email: consent.email,
      consents: consentsWithDetails,
    }
  })
}

export const getPaginatedConsents = (page: number, pageSize: number) => {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return database.collectedConsents.slice(start, end)
}
