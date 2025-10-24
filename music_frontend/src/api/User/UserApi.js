import api from "../axios";

export const reqPrincipal = async () => await api.get("/api/account/principal");

export const reqCheckNickname = (nickname) =>
  api.get(
    "/api/users/nickname/check",
    { params: { nickname } },
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    }
  );

export const reqUpdateNickname = async (data) => await api.put("/api/users/nickname/update", data);

export const reqGetUserDetail = async () => await api.get("/api/users/detail");

export const reqRegisterUser = async (data) => await api.post("/api/users", data);
