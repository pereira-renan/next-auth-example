import React from "react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Layout from "../../components/layout"
import { getProviders, signIn, getSession, getCsrfToken } from "next-auth/react"
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Container,
  Stack,
} from "@chakra-ui/react"

export default function SignIn({ providers, csrfToken }) {
  return (
    <Layout>
      <Container maxW="xl" centerContent>
        <Heading as="h1" textAlign="center">
          Welcome to our custom page
        </Heading>
        <Box alignContent="center" justifyContent="center" marginTop={12}>
          <Box className="email-form">
            <form method="post" action="/api/auth/signin/email">
              <Input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <label>
                Email address
                <Input type="text" id="email" name="email" />
              </label>
              <Button type="submit">Use your Email</Button>
            </form>
          </Box>
          <Stack isInline marginTop={12}>
            {Object.values(providers).map((provider) => {
              if (provider.name === "Email") {
                return
              }
              return (
                <Box key={provider.name}>
                  <Button variant="outline" onClick={() => signIn(provider.id)}>
                    Sign in with {provider.name}
                  </Button>
                </Box>
              )
            })}
          </Stack>
        </Box>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/client",
      },
    }
  }
  return {
    props: {
      session: session,
      providers: await getProviders(context),
      csrfToken: await getCsrfToken(context),
    },
  }
}
