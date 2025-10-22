import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchCurrentWeather, fetchForecast, reqGetWeatherCoords } from "../../api/weatherApi";

/**
 * 📍 useLocationQuery
 * city(도시) + district(구/군) 기준으로
 * 좌표 → 현재날씨 → 예보 순서로 요청하는 커스텀 훅
 */
export default function useLocationQuery(city = "부산광역시", district = "해운대구") {
  const queryClient = useQueryClient();

  // ✅ 1️⃣ 위도/경도 조회
  const {
    data: coords,
    isLoading: coordsLoading,
    isError: coordsError,
  } = useQuery({
    queryKey: ["weatherCoords", city, district],
    queryFn: async () => {
      const res = await reqGetWeatherCoords(city, district);
      console.log("🌍 [1] 좌표 API 응답:", res);
      return res?.body || res || null;
    },
    enabled: !!(city && district && city !== "도시 선택" && district !== "구 선택" && district.trim() !== ""), // ✅ 구가 선택되지 않으면 실행 X
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
  });

  // ✅ 2️⃣ 현재 날씨
  const {
    data: weather,
    isLoading: weatherLoading,
    isError: weatherError,
  } = useQuery({
    queryKey: ["weatherCurrent", coords?.lat, coords?.lon],
    queryFn: async () => {
      if (!coords?.lat || !coords?.lon) {
        // console.warn("⚠️ [2] coords 없음 → 날씨 요청 스킵됨");
        return null;
      }
      //   console.log("🚀 [2] fetchCurrentWeather 실행됨:", coords);
      const res = await fetchCurrentWeather(coords.lat, coords.lon);
      //   console.log("🌦️ [2] 현재 날씨 응답:", res);
      return res;
    },
    enabled: Boolean(coords?.lat && coords?.lon),
    staleTime: 0, // 매번 최신화
  });

  // ✅ 3️⃣ 5일 예보
  const {
    data: forecast,
    isLoading: forecastLoading,
    isError: forecastError,
  } = useQuery({
    queryKey: ["weatherForecast", coords?.lat, coords?.lon],
    queryFn: async () => {
      if (!coords?.lat || !coords?.lon) {
        console.warn("⚠️ [3] coords 없음 → 예보 요청 스킵됨");
        return null;
      }
      const res = await fetchForecast(coords.lat, coords.lon);
      //   console.log("📅 [3] 예보 API 응답:", res);
      return res;
    },
    enabled: Boolean(coords?.lat && coords?.lon),
    staleTime: 1000 * 60 * 60, // 1시간 캐시
  });

  // ✅ 4️⃣ 좌표가 바뀌면 현재 날씨만 리프레시
  useEffect(() => {
    if (coords?.lat && coords?.lon) {
      //   console.log("♻️ [4] 좌표 변경 감지 → 현재 날씨 쿼리 갱신");
      queryClient.invalidateQueries(["weatherCurrent"]);
    }
  }, [coords?.lat, coords?.lon, queryClient]);

  // ✅ 5️⃣ 오늘 시간대별 예보
  const todayHourly =
    forecast?.list
      ?.filter((item) => {
        const forecastDate = new Date(item.dt * 1000);
        const today = new Date();
        return forecastDate.getDate() === today.getDate();
      })
      .map((item) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          hour12: false,
        }),
        temp: Math.round(item.main.temp),
        description: item.weather[0]?.description,
        icon: item.weather[0]?.icon,
      })) || [];

  // ✅ 반환
  return {
    coords,
    weather,
    forecast,
    todayHourly,
    loading: coordsLoading || weatherLoading || forecastLoading,
    error: coordsError || weatherError || forecastError,
  };
}
