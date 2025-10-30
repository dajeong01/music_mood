import axios from "axios";
import api from "./axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

// ✅ (4) [선택 사항] 모든 도시 리스트 조회 (for select box)
export const reqGetCityList = async () => {
  const res = await api.get("/api/weather/cities");
  return res?.data?.body || [];
};

// ✅ (5) [선택 사항] 특정 시의 구 리스트 조회 (for select box)
export const reqGetDistrictList = async (city) => {
  const res = await api.get("/api/weather/districts", {
    params: { city },
  });
  return res?.data?.body || [];
};


// ✅ (1) DB에서 도시/구의 위도·경도 조회
export const reqGetWeatherCoords = async (city, district) => {
  const res = await api.get("/api/weather/locations", {
    params: { city, district },
  });
  // 백엔드가 ResponseDto.success 형태면 body만 추출
  return res?.data?.body || res?.data;
};

export const fetchCurrentWeather = async (lat, lon) => {
  // console.log("🛰️ [1] fetchCurrentWeather 실행됨. 좌표:", lat, lon); 

  const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
  // console.log("🧩 [2] 사용 중인 API_KEY:", API_KEY);

  if (!API_KEY) {
    // console.error("🚫 [3] API_KEY가 undefined. .env 파일에 'VITE_WEATHER_API_KEY' 확인 필요");
    return null;
  }

  try {
    // console.log("🌍 [4] OpenWeather API 요청 시작...");
    const res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: "metric",
        lang: "kr",
      },
    });
    // console.log("✅ [5] OpenWeather 응답 성공:", res.data);
    return res.data;
  } catch (err) {
    // console.error("❌ [6] OpenWeather API 요청 실패:", err.response?.data || err.message);
    return null;
  }
};



// ✅ (3) 5일간 날씨 예보 (OpenWeather API)
export const fetchForecast = async (lat, lon) => {
  const res = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: "metric",
      lang: "kr",
    },
  });
  return res.data;
};

