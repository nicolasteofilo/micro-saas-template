import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "../../../auth";
import { getInitials } from "./utils/get-initials";

export default async function DashboardPage() {
  const session = await auth();
  const user = session?.user;
  const initials = getInitials(user?.name || "");

  return (
    <main>
      <Avatar>
        <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </main>
  );
}
