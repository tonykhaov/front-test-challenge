import { Button, Checkbox, FormLabel, Input } from '@mui/material'
import { Form } from '@remix-run/react'
import { Flex, Spacer, styled } from 'styled-system/jsx'

export default function Index() {
  return (
    <styled.div w="xl" mx="auto">
      <Spacer h="12" />

      <Form method="POST">
        <div>
          <Input placeholder="Name" />
        </div>

        <Spacer h="4" />

        <div>
          <Input type="email" placeholder="Email address" />
        </div>

        <Spacer h="6" />
        <h1>I agree to:</h1>
        <Spacer h="4" />

        <styled.div borderWidth="2">
          <div>
            <FormLabel>
              <Checkbox />
              Receive newsletter
            </FormLabel>
          </div>

          <div>
            <FormLabel>
              <Checkbox />
              Be shown targeted ads
            </FormLabel>
          </div>

          <div>
            <FormLabel>
              <Checkbox />
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
