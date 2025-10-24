import api from "../axios";

export const reqUpdateUserGenres = async (genreIds) => {
  return api.post("/api/users/genres/update", genreIds);
};

export const reqGetUserGenres = async () => {
  return api.get("/api/users/genres");
};