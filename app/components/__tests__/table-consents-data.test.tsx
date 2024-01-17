import { render, screen } from '@testing-library/react'
import { TableConsentsData, UserConsentRow } from '../table-consents-data'
import { faker } from '@faker-js/faker'
import { createRemixStub } from '@remix-run/testing'

describe('TableConsentsData', () => {
  it('should render consents data in the table', () => {
    const mockConsents = [
      {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        consents: [
          {
            id: faker.string.uuid(),
            name: faker.lorem.word(),
            description: faker.lorem.sentence(),
            enabled: true,
          },
          {
            id: faker.string.uuid(),
            name: faker.lorem.word(),
            description: faker.lorem.sentence(),
            enabled: false,
          },
        ],
      },
      {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        consents: [
          {
            id: faker.string.uuid(),
            name: faker.lorem.word(),
            description: faker.lorem.sentence(),
            enabled: true,
          },
          {
            id: faker.string.uuid(),
            name: faker.lorem.word(),
            description: faker.lorem.sentence(),
            enabled: false,
          },
        ],
      },
    ]
    const RemixStub = createRemixStub([
      {
        Component: () => <TableConsentsData data={mockConsents} currentPage={1} lastPage={1} />,
        path: '/',
      },
    ])

    render(<RemixStub />)
    expect(screen.getByText(mockConsents[0].name)).toBeInTheDocument()
    expect(screen.getByText(mockConsents[0].email)).toBeInTheDocument()

    expect(screen.getByText(mockConsents[1].name)).toBeInTheDocument()
    expect(screen.getByText(mockConsents[1].email)).toBeInTheDocument()
  })
})
describe('UserConsentRow', () => {
  it("should render user's name, email and one enabled consent", () => {
    const mockConsent = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      consents: [
        {
          id: faker.string.uuid(),
          name: faker.lorem.word(),
          description: faker.lorem.sentence(),
          enabled: true,
        },
        {
          id: faker.string.uuid(),
          name: faker.lorem.word(),
          description: faker.lorem.sentence(),
          enabled: false,
        },
      ],
    }

    render(
      <table>
        <tbody>
          <UserConsentRow consent={mockConsent} />
        </tbody>
      </table>,
    )

    expect(screen.getByText(mockConsent.name)).toBeInTheDocument()
    expect(screen.getByText(mockConsent.email)).toBeInTheDocument()
    expect(screen.getByText(mockConsent.consents[0].description)).toBeInTheDocument()
    expect(screen.queryByText(mockConsent.consents[1].description)).not.toBeInTheDocument()
  })
  it("should render user's name, email and mulitple enabled consents", () => {
    const mockConsent = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      consents: [
        {
          id: faker.string.uuid(),
          name: faker.lorem.word(),
          description: faker.lorem.sentence(),
          enabled: true,
        },
        {
          id: faker.string.uuid(),
          name: faker.lorem.word(),
          description: faker.lorem.sentence(),
          enabled: true,
        },
      ],
    }

    render(
      <table>
        <tbody>
          <UserConsentRow consent={mockConsent} />
        </tbody>
      </table>,
    )

    expect(screen.getByText(mockConsent.name)).toBeInTheDocument()
    expect(screen.getByText(mockConsent.email)).toBeInTheDocument()
    // using regex because consents list is joined with a comma
    expect(screen.getByText(new RegExp(mockConsent.consents[0].description, 'i'))).toBeInTheDocument()
    expect(screen.getByText(new RegExp(mockConsent.consents[1].description, 'i'))).toBeInTheDocument()
  })

  it("should display none if user hasn't agreed to any consent", () => {
    const mockConsent = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      consents: [
        {
          id: faker.string.uuid(),
          name: faker.lorem.word(),
          description: faker.lorem.sentence(),
          enabled: false,
        },
        {
          id: faker.string.uuid(),
          name: faker.lorem.word(),
          description: faker.lorem.sentence(),
          enabled: false,
        },
      ],
    }

    render(
      <table>
        <tbody>
          <UserConsentRow consent={mockConsent} />
        </tbody>
      </table>,
    )

    expect(screen.getByText(mockConsent.name)).toBeInTheDocument()
    expect(screen.getByText(mockConsent.email)).toBeInTheDocument()
    expect(screen.getByText(/none/i)).toBeInTheDocument()
    expect(screen.queryByText(mockConsent.consents[0].description)).not.toBeInTheDocument()
  })
})
