import api from "../axios";

export const reqGetGenresFromDb = async () => {
  const res = await api.get("/api/genres");
  return res.data;
};