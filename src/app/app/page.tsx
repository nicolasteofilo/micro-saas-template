import { auth } from "../../../auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <h1>{session?.user?.email}</h1>
  )
}