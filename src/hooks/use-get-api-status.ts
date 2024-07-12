import { doGetApiStatus } from "@/server/actions/do-get-api-status";
import { useQuery } from "@tanstack/react-query";

export function useGetApiStatus() {
  const res = useQuery({
    queryKey: ["api-status"],
    queryFn: () => doGetApiStatus(),
  });

  return res;
}
