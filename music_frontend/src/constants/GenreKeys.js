// 🎶 장르 키값 → 한글 매핑
export const getKoreanGenreName = (genre = "") => {
  const map = {
    "k-pop": "케이팝",
    "pop": "팝",
    "r-n-b": "알앤비",
    "hip-hop": "힙합",
    "indie": "인디",
    "rock": "록",
    "j-pop": "제이팝",
    "anime": "애니송",
    "edm": "일렉트로닉",
    "house": "하우스",
    "jazz": "재즈",
    "soul": "소울",
    "acoustic": "어쿠스틱",
    "classical": "클래식",
    "soundtracks": "OST",
    "chill": "칠",
    "study": "공부용",
    "sleep": "수면용",
    "sad": "슬픈 노래",
    "ballad": "발라드",
  };

  return map[genre.toLowerCase()] || genre;
};

// 🎧 한글 → 영어 장르 키 (역매핑)
// 만약 사용자가 한글 선택 시 서버 전송용으로 영어 키를 쓰고 싶을 때 사용
export const getEnglishGenreKey = (korean = "") => {
  const map = {
    "케이팝": "k-pop",
    "팝": "pop",
    "알앤비": "r-n-b",
    "힙합": "hip-hop",
    "인디": "indie",
    "록": "rock",
    "제이팝": "j-pop",
    "애니송": "anime",
    "일렉트로닉": "edm",
    "하우스": "house",
    "재즈": "jazz",
    "소울": "soul",
    "어쿠스틱": "acoustic",
    "클래식": "classical",
    "OST": "soundtracks",
    "칠": "chill",
    "공부용": "study",
    "수면용": "sleep",
    "슬픈 노래": "sad",
    "발라드": "ballad",
  };

  return map[korean] || korean;
};
