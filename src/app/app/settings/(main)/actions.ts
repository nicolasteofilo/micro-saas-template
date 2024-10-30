'use server'

import { prisma } from '@/services/database'
import { auth } from '../../../../../auth'
import { UpdateProfileSchema } from './schemas/update-profile'

export async function updateProfile(data: UpdateProfileSchema) {
  const session = await auth()

  const { name } = data
  const id = session?.user?.id

  if (!id) {
    throw new Error('User not found')
  }

  const user = await prisma.user.update({
    where: { id },
    data: { name },
  })

  return user
}

export async function deleteProfile() {
  const session = await auth()
  const id = session?.user?.id

  if (!id) {
    throw new Error('User not found')
  }

  await prisma.session.deleteMany({
    where: { userId: id },
  })

  await prisma.account.deleteMany({
    where: { userId: id },
  })

  await prisma.user.delete({
    where: { id },
  })
}
