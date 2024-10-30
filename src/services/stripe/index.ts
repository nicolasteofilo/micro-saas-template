import { config } from '@/config'
import Stripe from 'stripe'

import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export const stripe = new Stripe(config.stripe.secretKey!, {
  apiVersion: '2024-09-30.acacia',
  httpClient: Stripe.createFetchHttpClient(),
})

export const getStripeCustomerByEmail = async (email: string) => {
  const customers = await stripe.customers.list({ email })
  return customers.data[0]
}

export const createStripeCustomer = async (input: {
  name?: string
  email: string
}) => {
  const customer = await getStripeCustomerByEmail(input.email)
  if (customer) return customer

  const newCustomer = await stripe.customers.create({
    email: input.email,
    name: input.name,
  })

  const createdSubscription = await stripe.subscriptions.create({
    customer: newCustomer.id,
    items: [
      {
        price: config.stripe.plans.free.stripePriceId,
      },
    ],
  })

  await prisma.user.update({
    where: { email: input.email },
    data: {
      stripeCustomerId: String(newCustomer.id),
      stripeSubscriptionId: String(createdSubscription.id),
      stripeSubscriptionStatus: String(createdSubscription.status),
      stripePriceId: String(config.stripe.plans.free.stripePriceId),
    },
  })

  console.log('newStripeCustomer', newCustomer)

  return newCustomer
}

export const createCheckoutSession = async (
  userId: string,
  userEmail: string,
  userStripeSubscriptionId: string,
) => {
  try {
    const customer = await createStripeCustomer({
      email: userEmail,
    })

    const subscription = await stripe.subscriptionItems.list({
      subscription: userStripeSubscriptionId,
      limit: 1,
    })

    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `http://localhost:3000/app/settings/plans?success=true`,
      flow_data: {
        type: 'subscription_update_confirm',
        after_completion: {
          type: 'redirect',
          redirect: {
            return_url: `http://localhost:3000/app/settings/plans?success=true`,
          },
        },
        subscription_update_confirm: {
          subscription: userStripeSubscriptionId,
          items: [
            {
              id: subscription.data[0].id,
              price: config.stripe.plans.plus.stripePriceId,
              quantity: 1,
            },
          ],
        },
      },
    })

    return {
      url: session.url,
    }
  } catch (error) {
    console.error(error)
    throw new Error('Error to create checkout session')
  }
}
