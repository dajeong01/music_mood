import api from "./axios";

export const reqSaveDiary = async (data) => {
  return api.post("/api/diary", data);
};

export const reqGetMonthlyDiaries = async (month) => {
  return api.get("/api/diary/month", {
    params: { month },
  });
};
