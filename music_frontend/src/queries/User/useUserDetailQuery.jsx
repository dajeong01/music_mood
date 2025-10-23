import { useQuery } from "@tanstack/react-query";
import { reqGetUserDetail } from "../../api/User/UserApi";

export default function useUserDetailQuery() {
  return useQuery({
    queryKey: ["userDetail"],
    queryFn: async () => await reqGetUserDetail(),
    staleTime: Infinity,
  });
}