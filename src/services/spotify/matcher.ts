/**
 * Spotify Matching Services - Search and Match Tracks
 */

import { Song } from "@/types";
import { 
  calculateStringSimilarity, 
  compareDurations,
  compareReleaseDates
} from "./utils/similarity";
import { 
  cleanSongTitle,
  extractArtistName
} from "./utils/songCleaner";
import { 
  getMatchDetails,
  getEnhancedMatchDetails,
  analyzeSongDetailsWithAI
} from "./utils/aiMatcher";
import { refreshAccessToken } from "./utils/auth";

/**
 * Search for a track on Spotify with AI enhancement
 */
export const searchTrack = async (song: Song, accessToken: string): Promise<any | null> => {
  try {
    // First try analyzing the song with AI if we have an API key
    let cleanedTitle = cleanSongTitle(song.title);
    let artist = extractArtistName(song.artist);
    
    // Try AI-enhanced analysis if possible
    try {
      const analysis = await analyzeSongDetailsWithAI(song.title, song.artist);
      
      if (analysis && analysis.confidence > 75) {
        // Use AI-extracted details if confidence is high
        cleanedTitle = analysis.extractedTitle;
        artist = analysis.extractedArtist;
        
        console.log("Using AI-enhanced song details:", {
          originalTitle: song.title,
          cleanedTitle,
          originalArtist: song.artist,
          artist
        });
      }
    } catch (error) {
      console.log("AI analysis unavailable, using basic cleaning:", error);
      // Continue with basic cleaned title and artist
    }
    
    // First try: search with both title and artist
    let tracks = await searchWithTitleAndArtist(cleanedTitle, artist, accessToken);
    
    // If no results, try searching with just the title
    if (!tracks || tracks.length === 0) {
      tracks = await searchWithTitleOnly(cleanedTitle, accessToken);
    }
    
    if (!tracks || tracks.length === 0) {
      return null;
    }
    
    // Find the best match with AI-enhanced algorithms
    const bestMatch = await findBestMatch(song, tracks);
    
    return bestMatch;
  } catch (error: any) {
    console.error("Error searching track:", error.message);
    
    // Handle token expiration
    if (error.message?.includes("401") || error.message?.includes("expired")) {
      try {
        const newToken = await refreshAccessToken();
        if (newToken) {
          return searchTrack(song, newToken);
        }
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
      }
    }
    
    return null;
  }
};

/**
 * Search with both title and artist
 */
const searchWithTitleAndArtist = async (title: string, artist: string, accessToken: string): Promise<any[]> => {
  const query = `track:${title} artist:${artist}`;
  const encodedQuery = encodeURIComponent(query);
  
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodedQuery}&type=track&limit=5`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }
  );
  
  if (response.status === 401) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      return searchWithTitleAndArtist(title, artist, newToken);
    }
    throw new Error("Spotify session expired");
  }
  
  if (!response.ok) {
    throw new Error(`Spotify search failed: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.tracks.items || [];
};

/**
 * Search with title only (more flexible)
 */
const searchWithTitleOnly = async (title: string, accessToken: string): Promise<any[]> => {
  const query = `track:${title}`;
  const encodedQuery = encodeURIComponent(query);
  
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodedQuery}&type=track&limit=8`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }
  );
  
  if (response.status === 401) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      return searchWithTitleOnly(title, newToken);
    }
    throw new Error("Spotify session expired");
  }
  
  if (!response.ok) {
    throw new Error(`Spotify search failed: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.tracks.items || [];
};

/**
 * Calculate match confidence score with AI enhancements
 */
export const calculateMatchConfidence = async (song: Song, track: any): Promise<number> => {
  try {
    // Use the enhanced AI matching algorithm
    const matchDetails = await getEnhancedMatchDetails(song, track);
    return matchDetails.enhancedScore;
  } catch (error) {
    console.error("Error with enhanced matching, falling back to basic:", error);
    
    // Basic matching as fallback
    let confidence = 0;
    
    // Title Similarity (25% weight)
    const titleSimilarity = calculateStringSimilarity(song.title, track.name);
    confidence += titleSimilarity * 0.25;
    
    // Artist Similarity (25% weight)
    const artistString = track.artists.map((a: any) => a.name).join(" ");
    const artistSimilarity = calculateStringSimilarity(song.artist, artistString);
    confidence += artistSimilarity * 0.25;
    
    // Duration Comparison (40% weight)
    const durationScore = compareDurations(song.duration, track.duration_ms);
    confidence += durationScore / 100 * 0.40;
    
    // Release Date Comparison (10% weight)
    const releaseDateScore = compareReleaseDates(song.uploadDate, track.album.release_date);
    confidence += releaseDateScore / 100 * 0.10;
    
    return Math.min(100, Math.round(confidence * 100));
  }
};

/**
 * Find the best matching track from a list of tracks
 */
export const findBestMatch = async (song: Song, tracks: any[]): Promise<any | null> => {
  let bestMatch = null;
  let bestConfidence = 0;
  
  for (const track of tracks) {
    const confidence = await calculateMatchConfidence(song, track);
    
    if (confidence > bestConfidence) {
      bestConfidence = confidence;
      bestMatch = track;
    }
  }
  
  if (bestMatch) {
    return {
      ...bestMatch,
      confidence: bestConfidence
    };
  }
  
  return null;
};

/**
 * Search for songs on Spotify by query
 */
export const searchSpotifySongs = async (query: string, accessToken: string): Promise<any[]> => {
  try {
    const encodedQuery = encodeURIComponent(query);
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodedQuery}&type=track&limit=10`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );
    
    if (response.status === 401) {
      // Token expired, attempt to refresh
      const newToken = await refreshAccessToken();
      if (newToken) {
        return searchSpotifySongs(query, newToken);
      } else {
        throw new Error("Spotify session expired. Please log in again.");
      }
    }
    
    if (!response.ok) {
      throw new Error(`Spotify search failed: ${response.statusText} (${response.status})`);
    }
    
    const data = await response.json();
    
    // Check if we have valid data structure
    if (!data || !data.tracks || !Array.isArray(data.tracks.items)) {
      console.error("Unexpected Spotify API response:", data);
      throw new Error("Unexpected response from Spotify API");
    }
    
    return data.tracks.items || [];
  } catch (error) {
    console.error("Error searching Spotify:", error);
    throw error;
  }
};
