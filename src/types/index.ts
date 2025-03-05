
export interface Song {
  id: string;
  title: string;
  artist: string;
  thumbnail?: string;
  duration?: string;
  uploadDate?: string;
  spotifyId?: string;
  spotifyUri?: string;
  selected: boolean;
  matchConfidence?: number; // Added to store the confidence score
}

export interface PlaylistData {
  title: string;
  description?: string;
  songs: Song[];
}

export enum ConversionStep {
  INPUT_URL = 0,
  EXTRACTING = 1,
  EDIT_SONGS = 2,
  NAME_PLAYLIST = 3,
  REVIEW_MATCHES = 4, // New step added here
  CREATE_PLAYLIST = 5,
  COMPLETED = 6,
}
