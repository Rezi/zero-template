import {betterAuth} from 'better-auth'
import {drizzleAdapter} from 'better-auth/adapters/drizzle'
import {db, authSchema} from '@zero-music/db'

const clientId = process.env.GITHUB_CLIENT_ID
const clientSecret = process.env.GITHUB_CLIENT_SECRET

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders:
    clientId && clientSecret
      ? {
          github: {
            clientId,
            clientSecret,
          },
        }
      : undefined,
  advanced: process.env.COOKIE_DOMAIN
    ? {
        crossSubDomainCookies: {
          enabled: true,
          domain: process.env.COOKIE_DOMAIN,
        },
      }
    : undefined,
})
