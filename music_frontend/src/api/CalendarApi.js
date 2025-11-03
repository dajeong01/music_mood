import api from "./axios";

export const reqSaveDiary = async (data) => {
  return api.post("/api/diary", data);
};

export const reqGetMonthlyDiaries = async (month) => {
  return api.get("/api/diary/month", {
    params: { month },
  });
};

export const reqGetDiaryStatistics = async () => {
  const res = await api.get("/api/diary/statistics");
  return res.data;
};
