export const config = {
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    plans: {
      free: {
        stripePriceId: process.env.STRIPE_FREE_PRICE_ID,
        quota: {
          tasks: 5,
        },
      },
      plus: {
        stripePriceId: process.env.STRIPE_PLUS_PRICE_ID,
        quota: {
          tasks: -1,
        },
      },
    },
  },
}
