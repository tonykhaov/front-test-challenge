export type GivenConsent = {
  id: string
  name: string
  email: string
  consents: Array<AgreedConsent>
}

export type AgreedConsent = {
  id: Consent['id']
  enabled: boolean
}

export type Consent = {
  id: string
  name: string
  description: string
}

export const database: {
  givenConsents: Array<GivenConsent>
  consentsList: Array<Consent>
} = {
  givenConsents: [],
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
