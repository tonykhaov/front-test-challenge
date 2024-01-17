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
  collectedConsents: [],
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
