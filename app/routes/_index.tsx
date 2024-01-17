import * as React from 'react'
import { Alert, Button, Checkbox, FormLabel, Input } from '@mui/material'
import { ActionFunctionArgs, json } from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import { Flex, Spacer, styled } from 'styled-system/jsx'
import { database, type CollectedConsent } from '../database.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.formData()

  const name = body.get('name')
  const email = body.get('email')

  const userConsents: CollectedConsent['consents'] = database.consentsList.map((consent) => ({
    id: consent.id,
    enabled: body.get(`consent-${consent.id}`) === 'on',
  }))

  const collectedConsent: CollectedConsent = {
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
export default function Index() {
  const data = useLoaderData<typeof loader>()

  const actionData = useActionData<typeof action>()
  const formRef = React.useRef<HTMLFormElement>(null)

  React.useEffect(() => {
    if (actionData?.ok) {
      formRef.current?.reset()
    }
  }, [actionData])

  return (
    <styled.div w="xl" mx="auto">
      <Spacer h="12" />

      {actionData?.ok && (
        <>
          <Alert>
            <strong>Thank you for your consent!</strong> We will not share your personal information with third parties.
          </Alert>
          <Spacer h="4" />
        </>
      )}

      <Form ref={formRef} method="post">
        <div>
          <Input placeholder="Name" name="name" required />
        </div>

        <Spacer h="4" />

        <div>
          <Input type="email" placeholder="Email address" name="email" required />
        </div>

        <Spacer h="6" />
        <h1>I agree to:</h1>
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
