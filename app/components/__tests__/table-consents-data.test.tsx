import { render, screen } from '@testing-library/react'
import { Pagination, TableConsentsData, UserConsentRow } from '../table-consents-data'
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

describe('Pagination', () => {
  it('should not show previous page link if current page is 1', () => {
    const RemixStub = createRemixStub([
      {
        Component: () => (
          <table>
            <tfoot>
              <Pagination currentPage={1} lastPage={2} />
            </tfoot>
          </table>
        ),
        path: '/',
      },
    ])

    render(<RemixStub />)
    expect(screen.queryByText(/previous page/i)).not.toBeInTheDocument()
  })

  it('should show previous page link if current page is greater than 1', () => {
    const RemixStub = createRemixStub([
      {
        Component: () => (
          <table>
            <tfoot>
              <Pagination currentPage={2} lastPage={2} />
            </tfoot>
          </table>
        ),
        path: '/',
      },
    ])

    render(<RemixStub />)
    expect(screen.getByText(/previous page/i)).toBeInTheDocument()
  })

  it('should not show next page link if current page is last page', () => {
    const RemixStub = createRemixStub([
      {
        Component: () => (
          <table>
            <tfoot>
              <Pagination currentPage={2} lastPage={2} />
            </tfoot>
          </table>
        ),
        path: '/',
      },
    ])

    render(<RemixStub />)
    expect(screen.queryByText(/next page/i)).not.toBeInTheDocument()
  })

  it('should show next page link if current page is less than last page', () => {
    const RemixStub = createRemixStub([
      {
        Component: () => (
          <table>
            <tfoot>
              <Pagination currentPage={1} lastPage={2} />
            </tfoot>
          </table>
        ),
        path: '/',
      },
    ])

    render(<RemixStub />)
    expect(screen.getByText(/next page/i)).toBeInTheDocument()
  })

  it('current page should be active', () => {
    const currentPage = 4
    const RemixStub = createRemixStub([
      {
        Component: () => (
          <table>
            <tfoot>
              <Pagination currentPage={currentPage} lastPage={currentPage + 5} />
            </tfoot>
          </table>
        ),
        path: '/',
      },
    ])

    render(<RemixStub />)
    expect(screen.getByText(currentPage)).toHaveAttribute('aria-current', 'page')
  })

  it('should see both previous page and next page when current page is in the middle', () => {
    const currentPage = 4
    const RemixStub = createRemixStub([
      {
        Component: () => (
          <table>
            <tfoot>
              <Pagination currentPage={currentPage} lastPage={currentPage + 5} />
            </tfoot>
          </table>
        ),
        path: '/',
      },
    ])

    render(<RemixStub />)
    expect(screen.getByText(/previous page/i)).toBeInTheDocument()
    expect(screen.getByText(/next page/i)).toBeInTheDocument()
  })

  it('should have accessiblity attributes', () => {
    const RemixStub = createRemixStub([
      {
        Component: () => (
          <table>
            <tfoot>
              <Pagination currentPage={2} lastPage={3} />
            </tfoot>
          </table>
        ),
        path: '/',
      },
    ])

    render(<RemixStub />)
    expect(screen.getByLabelText(/Go to previous page/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/go to next page/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/go to page 2/i)).toBeInTheDocument()
  })
})
