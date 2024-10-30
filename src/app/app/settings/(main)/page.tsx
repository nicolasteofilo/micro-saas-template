import { auth } from '../../../../../auth'
import { ProfileForm } from './_components/profile-form'

export default async function Settings() {
  const session = await auth()
  const user = session?.user

  return (
    <div className="flex justify-center">
      <ProfileForm user={user} />
    </div>
  )
}
