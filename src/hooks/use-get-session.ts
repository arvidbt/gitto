import { auth } from "@/auth";
import { useQuery } from "@tanstack/react-query";

export function useGetSession() {
  const { data } = useQuery({
    queryKey: ["get-session"],
    queryFn: async () => await auth(),
  });

  return data;
}
