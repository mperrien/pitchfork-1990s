export interface Album {
  artist: string;
  performers: string[];
  title: string;
  year: number;
  label: string;
  genre: "rock" | "electronic" | "hiphop" | "rnb" | "other" | "";
  cover: string;
  "1999": number | null;
  "2003": number | null;
  "2022": number | null;
}

export interface AlbumInfo {
  artist: string;
  title: string;
  year: number;
  label: string;
  genre: "rock" | "electronic" | "hiphop" | "rnb" | "other" | "";
  cover: string;
}

export interface Year {
  "Rock": number;
	"Electronic": number;
	"Hip Hop": number;
	"R&B": number;
	"Other": number;
}

export interface GenresData {
  "1999": Year;
  "2003": Year;
  "2022": Year;
  "total": Year;
}

export interface Path {
  sanitized_title: string;
  start: [number, number];
  start_control: [number, number];
  end_control: [number, number];
  end: [number, number];
}
// <path
//    d={`M${start[0]},${start[1]} C${start_control[0]},${start_control[1]}
//       ${end_control[0]},${end_control[1]} {end[0]},${end[1]}`}
// />