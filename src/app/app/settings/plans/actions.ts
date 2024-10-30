'use server'

import { prisma } from '@/services/database'
import { createCheckoutSession } from '@/services/stripe'
import { redirect } from 'next/navigation'
import { auth } from '../../../../../auth'

export const countUserTasks = async (userId: string) => {
  const taskCount = await prisma.todo.count({
    where: {
      userId,
    },
  })

  return taskCount
}

export const createSubscribeSession = async () => {
  const session = await auth()
  const id = session?.user?.id

  if (!id) {
    throw new Error('User not   found')
  }

  const checkoutSession = await createCheckoutSession(
    session.user?.id!,
    session.user?.email!,
    session.user?.stripeSubscriptionId!,
  )

  if (!checkoutSession.url) {
    throw new Error('Checkout session URL not found')
  }

  redirect(checkoutSession.url)
}
