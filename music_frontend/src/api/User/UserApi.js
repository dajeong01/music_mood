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

export const reqGetUserDetail = async () => await api.get("/api/users/detail");

export const reqRegisterUser = async (data) => await api.post("/api/users", data);

// export const reqUpdateUser = (data) =>
//   api.post("/api/mypage", data, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

// export const reqUserInfoUpdate = (data) => api.patch(`/api/user/update`, data);
