import { CollectedConsent } from '../database.server'

export const mockCollectedConsents: Array<CollectedConsent> = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    consents: [
      { id: '1', enabled: true },
      { id: '2', enabled: false },
      { id: '3', enabled: true },
    ],
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane.doe@gmail.com',
    consents: [
      { id: '1', enabled: true },
      { id: '2', enabled: true },
      { id: '3', enabled: false },
    ],
  },
  {
    id: '3',
    name: 'James Smith',
    email: 'james.smith@gmail.com',
    consents: [
      { id: '1', enabled: false },
      { id: '2', enabled: false },
      { id: '3', enabled: true },
    ],
  },
  {
    id: '4',
    name: 'Mary Smith',
    email: 'mary.smith@gmail.com',
    consents: [
      { id: '1', enabled: true },
      { id: '2', enabled: true },
      { id: '3', enabled: true },
    ],
  },
  {
    id: '5',
    name: 'Robert Johnson',
    email: 'robert.johnson@gmail.com',
    consents: [
      { id: '1', enabled: true },
      { id: '2', enabled: false },
      { id: '3', enabled: true },
    ],
  },
  {
    id: '6',
    name: 'Patricia Williams',
    email: 'patricia.williams@gmail.com',
    consents: [
      { id: '1', enabled: true },
      { id: '2', enabled: false },
      { id: '3', enabled: true },
    ],
  },
]
