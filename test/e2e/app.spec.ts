import { faker } from '@faker-js/faker'
import { test, expect } from '@playwright/test'

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
