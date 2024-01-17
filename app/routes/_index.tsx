import * as React from 'react'
import { Alert, Button, Checkbox, FormLabel, Input, Link, Typography } from '@mui/material'
import { ActionFunctionArgs, json } from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import { Flex, Spacer, styled } from 'styled-system/jsx'
import { database } from '../database.server'
import { CollectedConsent } from '../types'

export default function Index() {
  const data = useLoaderData<typeof loader>()

  const actionData = useActionData<typeof action>()
  const emailRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (actionData && 'error' in actionData) {
      emailRef.current?.focus()
    }
  }, [actionData])

  return (
    <styled.div w="xl" mx="auto">
      <Spacer h="8" />

      {actionData?.ok && (
        <>
          <Alert>
            <strong>Thank you for your consent!</strong> We will not share your personal information with third parties.
          </Alert>
          <Spacer h="4" />
        </>
      )}

      {actionData && 'error' in actionData && (
        <>
          <Alert severity="error">
            <strong>Oops!</strong> {typeof actionData.error === 'string' ? actionData.error : 'Something went wrong.'}
          </Alert>
          <Spacer h="4" />
        </>
      )}

      <Typography variant="h5">Give consent</Typography>
      <Spacer h="2" />

      <Typography>
        We are collecting your personal information to provide you with the service you requested. Your personal
        information will be used and stored in accordance with our <Link>Privacy Policy</Link>.
      </Typography>

      <Spacer h="2" />

      <Form method="post">
        <div>
          <Input placeholder="Name" name="name" required />
        </div>

        <Spacer h="4" />

        <div>
          <Input inputRef={emailRef} type="email" placeholder="Email address" name="email" required />
        </div>

        <Spacer h="6" />
        <Typography variant="subtitle1">I agree to:</Typography>
        <Spacer h="4" />

        <styled.div borderWidth="2">
          {data.consentsList.map((consent) => (
            <div key={consent.id}>
              <FormLabel>
                <Checkbox name={`consent-${consent.id}`} />
                {consent.name}
              </FormLabel>
            </div>
          ))}
        </styled.div>

        <Spacer h="8" />

        <Flex justifyContent="center">
          <Button type="submit" variant="contained">
            Give consent
          </Button>
        </Flex>
      </Form>
    </styled.div>
  )
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.formData()

  const name = body.get('name')
  if (typeof name !== 'string') {
    return json({ ok: false, error: 'Name is required' })
  }

  const email = body.get('email')
  if (typeof email !== 'string') {
    return json({ ok: false, error: 'Email is required' })
  }

  const emailAlreadyExists = database.collectedConsents.find((consent) => consent.email === email)
  if (emailAlreadyExists) {
    return json({ ok: false, error: 'Email already exists' })
  }

  const userConsents: CollectedConsent['consents'] = database.consentsList.map((consent) => ({
    id: consent.id,
    enabled: body.get(`consent-${consent.id}`) === 'on',
  }))

  const collectedConsent: CollectedConsent = {
    id: Date.now().toString(),
    name,
    email,
    consents: userConsents,
  }

  database.collectedConsents.push(collectedConsent)

  return json({ ok: true })
}

export const loader = async () => {
  return { consentsList: database.consentsList }
}
