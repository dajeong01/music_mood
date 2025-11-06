import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  reqCreatePlaylist,
  reqGetUserPlaylists,
  reqAddTrackToPlaylist,
  reqGetTracksByPlaylist
} from "../../api/Spotify/PlaylistApi";

// ✅ 내 플레이리스트 조회
export const usePlaylists = () => {
  return useQuery({
    queryKey: ["playlists"],
    queryFn: async () => {
      const res = await reqGetUserPlaylists();
      return res.data.body ?? [];
    },
  });
};

// ✅ 플레이리스트 생성
export const useCreatePlaylist = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: reqCreatePlaylist,
    onSuccess: () => qc.invalidateQueries(["playlists"]),
  });
};

// ✅ 특정 playlist 트랙 불러오기
export const usePlaylistTracks = (playlistId) => {
  return useQuery({
    queryKey: ["playlistTracks", playlistId],
    queryFn: async () => {
      const res = await reqGetTracksByPlaylist(playlistId);
      return res.data.body ?? [];
    },
    enabled: !!playlistId
  });
};

// ✅ 트랙 추가
export const useAddTrackToPlaylist = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ playlistId, track }) =>
      reqAddTrackToPlaylist(playlistId, track),
    onSuccess: () => {
      qc.invalidateQueries(["playlistTracks"]);
    },
  });
};
