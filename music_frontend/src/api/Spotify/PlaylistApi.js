
import api from "../axios";

// ✅ 플레이리스트 생성
export const reqCreatePlaylist = async (data) => {
  return api.post("/api/playlist", data);
};

// ✅ 내 플레이리스트 목록 조회
export const reqGetUserPlaylists = async () => {
  return api.get("/api/playlist");
};

// ✅ 트랙 추가 (trackDTO 그대로 보냄)
export const reqAddTrackToPlaylist = async (playlistId, track) => {
  return api.post(`/api/playlist/${playlistId}/track`, track);
};

// ✅ 특정 플레이리스트 트랙들 조회
export const reqGetTracksByPlaylist = async (playlistId) => {
  return api.get(`/api/playlist/${playlistId}/tracks`);
};
