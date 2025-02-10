import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support'

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      // this needs to be an absolute url, as relative urls cannot be used in SSR
      uri: `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
    })
  })
})