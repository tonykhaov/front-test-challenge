import { faker } from '@faker-js/faker'
import { test, expect } from '@playwright/test'
import { mockCollectedConsents } from '~/app/mock/data'

test('collect a new consent flow: give consent and see it in the collected consents', async ({ page }) => {
  const user = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
  } as const

  await page.goto('/')

  const nameInput = page.getByLabel(/name/i)
  await nameInput.fill(user.name)

  const emailInput = page.getByLabel(/email/i)
  await emailInput.fill(user.email)

  const receiveNewsletterCheckbox = page.getByLabel(/receive newsletter/i)
  await receiveNewsletterCheckbox.check()

  const beShownTargetedAdsCheckbox = page.getByLabel(/be shown targeted ads/i)
  await beShownTargetedAdsCheckbox.check()

  const contributeToAnonymousVisitStatisticsCheckbox = page.getByLabel(/contribute to anonymous visit statistics/i)
  await contributeToAnonymousVisitStatisticsCheckbox.check()

  const submitButton = page.getByRole('button', {
    name: /give consent/i,
  })
  await submitButton.click()

  await expect(
    page.getByText(/thank you for your consent! We will not share your personal information with third parties\./i),
  ).toBeVisible()

  const collectedConsentsLink = page.getByRole('link', {
    name: /collected consents/i,
  })
  await collectedConsentsLink.click()

  await expect(page).toHaveURL('/consents')

  const lastPageButton = page.getByTestId('last-page')
  lastPageButton.click()

  const nameCell = page.getByText(user.name)
  await expect(nameCell).toBeVisible()
  const emailCell = page.getByText(user.email)
  await expect(emailCell).toBeVisible()
})

test('pagination flow: should see collected consents displayed two by two per page by default', async ({ page }) => {
  await page.goto('/consents')

  const firstUserInMockDb = page.getByText(mockCollectedConsents[0].name)
  await expect(firstUserInMockDb).toBeVisible()
  const secondUserInMockDb = page.getByText(mockCollectedConsents[1].name)
  await expect(secondUserInMockDb).toBeVisible()
  const thirdUserInMockDb = page.getByText(mockCollectedConsents[2].name)
  await expect(thirdUserInMockDb).toBeHidden()

  const nextPageButton = page.getByLabel(/go to next page/i)
  await nextPageButton.click()
  await expect(page).toHaveURL('/consents?page=2')
  await expect(firstUserInMockDb).toBeHidden()
  await expect(secondUserInMockDb).toBeHidden()
  await expect(thirdUserInMockDb).toBeVisible()
  const fourthUserInMockDb = page.getByText(mockCollectedConsents[3].name)
  await expect(fourthUserInMockDb).toBeVisible()

  const previousPageButton = page.getByLabel(/go to previous page/i)
  await previousPageButton.click()
  await expect(page).toHaveURL('/consents?page=1')
  await expect(firstUserInMockDb).toBeVisible()
  await expect(secondUserInMockDb).toBeVisible()
  await expect(thirdUserInMockDb).toBeHidden()
  await expect(fourthUserInMockDb).toBeHidden()
})
