export interface Album {
  artist: string;
  featuring: string[];
  title: string;
  year: number;
  label: string;
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
  cover: string;
}

export interface Path {
  start: [number, number];
  start_control: [number, number];
  end_control: [number, number];
  end: [number, number];
}
// <path
//    d={`M${start[0]},${start[1]} C${start_control[0]},${start_control[1]}
//       ${end_control[0]},${end_control[1]} {end[0]},${end[1]}`}
// />