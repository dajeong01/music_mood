import { useQuery } from "@tanstack/react-query";
import { reqGetCityList } from "../../api/weatherApi";

function useCityListQuery() {
  return useQuery({
    queryKey: ["cityList"],
    queryFn: async () => {
      const res = await reqGetCityList();
      return res;
    },
    staleTime: Infinity,
  });
}

export default useCityListQuery;