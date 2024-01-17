import * as React from 'react'
import { Alert, Button, Checkbox, FormLabel, Input } from '@mui/material'
import { ActionFunctionArgs, json } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import { Flex, Spacer, styled } from 'styled-system/jsx'

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.formData()

  const name = body.get('name')
  const email = body.get('email')
  const receiveNewsletter = body.get('receive-newsletter') === 'on'
  const beShownTargetedAds = body.get('be-shown-targeted-ads') === 'on'
  const contributeToAnonymousVisitStatistics = body.get('contribute-to-anonymous-visit-statistics') === 'on'

  console.log({ name, email, receiveNewsletter, beShownTargetedAds, contributeToAnonymousVisitStatistics })
  return json({ ok: true })
}

export default function Index() {
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
          <div>
            <FormLabel>
              <Checkbox name="receive-newsletter" />
              Receive newsletter
            </FormLabel>
          </div>

          <div>
            <FormLabel>
              <Checkbox name="be-shown-targeted-ads" />
              Be shown targeted ads
            </FormLabel>
          </div>

          <div>
            <FormLabel>
              <Checkbox name="contribute-to-anonymous-visit-statistics" />
              Contribute to anonymous visit statistics
            </FormLabel>
          </div>
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
