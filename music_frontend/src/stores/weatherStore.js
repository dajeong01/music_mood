import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWeatherStore = create(
  persist(
    (set) => ({
      coords: null,
      weather: null,
      forecast: [],
      todayHourly: [],
      loading: true,

      setWeatherData: (data) =>
        set({
          coords: data.coords,
          weather: data.weather,
          forecast: data.forecast,
          todayHourly: data.todayHourly,
          loading: false,
        }),

      setLoading: (loading) => set({ loading }),
      resetWeather: () =>
        set({
          coords: null,
          weather: null,
          forecast: [],
          todayHourly: [],
          loading: true,
        }),
    }),
    {
      name: "weather-storage", // localStorage key
    }
  )
);
