import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import { useGetSession } from "@/hooks/use-get-session";
import { User } from "lucide-react";

export function Avatar() {
  const session = useGetSession();

  return (
    <Avatar>
      <AvatarImage src={session?.user?.image} />
      <AvatarFallback>
        <User />
      </AvatarFallback>
    </Avatar>
  );
}
