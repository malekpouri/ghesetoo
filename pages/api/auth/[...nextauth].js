import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import jwt from 'jsonwebtoken'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET_ID,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      user.id = null
      const response = await fetch(process.env.API_URL + '/api/auth-login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' },
      })
      console.log(response)
      return true
    },
    async session({ session, token, user }) {
      const userToken = jwt.sign(
        {
          name: token.user.name,
          id: token.user.id,
          email: token.user.email,
          family: token.user.family,
        },
        process.env.GOOGLE_SECRET_ID,
        { expiresIn: '24h' }
      )
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      session.userToken = userToken
      session.user.family = token.user.family
      session.user.name = token.user.name
      session.user.id = token.user.id
      return session
    },
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signing
      let user = {
        id: null,
        email: token.email,
        name: token.name,
        family: null,
      }
      if (account) {
        token.accessToken = account.access_token
      }
      const response = await fetch(process.env.API_URL + `/api/getUserByEmail?email=${user.email}`)
      const data = await response.json()
      user.family = data.family
      user.id = data.id
      user.name = data.name
      token.user = user
      return token
    },
  },
})
