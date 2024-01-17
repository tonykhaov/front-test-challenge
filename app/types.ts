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

export type CollectedConsentWithConsentDetails = Omit<CollectedConsent, 'consents'> & {
  consents: Array<UserConsent & Partial<Consent>>
}
