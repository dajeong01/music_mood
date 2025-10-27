import { useQuery } from "@tanstack/react-query";
import { reqGetUserGenres } from "../../api/Spotify/UserGenreApi";

export default function useUserGenreQuery() {
  return useQuery({
    queryKey: ["userGenres"],
    queryFn: async () => {
      const res = await reqGetUserGenres();
      return res.data.body; 
    },
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  });
}