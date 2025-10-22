import { useEffect, useState } from "react";
import { fetchCurrentWeather, fetchForecast } from "../api/weatherApi";

export function useWeather(lat = 35.1796, lon = 129.0756) {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]); // 5일 예보
  const [todayHourly, setTodayHourly] = useState([]); // ✅ 오늘 시간대별 예보
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getWeather() {
      setLoading(true);
      try {
        const [current, forecastData] = await Promise.all([fetchCurrentWeather(lat, lon), fetchForecast(lat, lon)]);

        setWeather(current);
        setForecast(forecastData.daily);

        const todayStr = new Date().toISOString().split("T")[0];
        const hourlyData =
          forecastData.list
            ?.filter((item) => item.dt_txt?.startsWith(todayStr))
            .map((item) => ({
              time: item.dt_txt.split(" ")[1].slice(0, 5),
              temp: Math.round(item.main.temp),
              description: item.weather[0].description,
              icon: item.weather[0].icon,
            })) || [];

        setTodayHourly(hourlyData);
      } catch (err) {
        console.error("날씨 데이터 오류:", err);
      } finally {
        setLoading(false);
      }
    }

    getWeather();
  }, [lat, lon]);

  return { weather, forecast, todayHourly, loading };
}
