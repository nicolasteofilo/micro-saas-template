'use server'
import { signIn, signOut } from '../../auth'

export async function SignIn() {
  return await signIn('google', { redirectTo: '/app' })
}

export async function SignOut() {
  return await signOut({ redirect: true, redirectTo: '/' })
}