// 📁 src/queries/Weather/useDistrictListQuery.js

import { useQuery } from "@tanstack/react-query";
import { reqGetDistrictList } from "../../api/weatherApi";

export default function useDistrictListQuery(city) {
  return useQuery({
    queryKey: ["districtList", city],
    queryFn: async () => {
      const res = await reqGetDistrictList(city);
      console.log("🏙️ [구 리스트 응답]", res);
      return res;
    },
    enabled: !!(city && city !== "도시 선택"), 
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
  });
}
