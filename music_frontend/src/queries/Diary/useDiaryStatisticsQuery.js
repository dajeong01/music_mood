import { useQuery } from "@tanstack/react-query";
import { reqGetDiaryStatistics } from "../../api/CalendarApi";

export default function useDiaryStatisticsQuery() {
  return useQuery({
    queryKey: ["diaryStatistics"],
    queryFn: reqGetDiaryStatistics,
  });
}