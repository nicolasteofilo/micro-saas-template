import { prisma } from '@/services/database'
import { createStripeCustomer } from '@/services/stripe'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/auth',
    signOut: '/auth',
    error: '/auth',
    newUser: '/app',
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  cookies: {
    sessionToken: {
      name: 'authjs.session-token',
    },
  },
  adapter: PrismaAdapter(prisma),
  events: {
    createUser: async ({ user }) => {
      await createStripeCustomer({
        email: user.email!,
        name: user.name!,
      })
    },
  },
})
