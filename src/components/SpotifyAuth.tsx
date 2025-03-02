
import { Button } from "@/components/ui/button";
import { initiateSpotifyLogin, isLoggedIn, logout } from "@/services/spotifyService";

interface SpotifyAuthProps {
  onLogin: () => void;
  isLoggedIn: boolean;
}

const SpotifyAuth = ({ onLogin, isLoggedIn: propIsLoggedIn }: SpotifyAuthProps) => {
  const handleLogin = async () => {
    try {
      await initiateSpotifyLogin();
      // onLogin will be called in the callback page after successful authentication
    } catch (error) {
      console.error("Failed to initiate Spotify login:", error);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.reload(); // Refresh the page to update state
  };

  return (
    <div className="flex flex-col items-center space-y-4 py-4">
      {!propIsLoggedIn ? (
        <>
          <p className="text-center text-muted-foreground">
            Connect your Spotify account to create playlists
          </p>
          <Button 
            onClick={handleLogin}
            className="bg-spotify hover:bg-spotify-dark font-medium"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM16.5917 16.4083C16.3733 16.6267 16.0483 16.7267 15.7317 16.7267C15.4067 16.7267 15.09 16.6267 14.8633 16.4083C14.705 16.25 14.5717 16.065 14.4667 15.8633C14.3617 15.6617 14.2833 15.4433 14.2833 15.225C14.2833 15.0067 14.3617 14.7883 14.4667 14.5867C14.5717 14.385 14.705 14.2 14.8633 14.0417C15.09 13.815 15.4067 13.715 15.7317 13.715C16.0483 13.715 16.3733 13.815 16.5917 14.0417C16.75 14.2 16.8833 14.385 16.9883 14.5867C17.0933 14.7883 17.1717 15.0067 17.1717 15.225C17.1717 15.4433 17.0933 15.6617 16.9883 15.8633C16.8833 16.065 16.75 16.25 16.5917 16.4083ZM16.6 13.0533C15.29 12.1483 13.6233 11.8483 11.8633 12.1483C11.515 12.2117 11.1583 12.3033 10.8183 12.42C10.6667 12.475 10.5067 12.4033 10.4517 12.2517C10.3967 12.1 10.4683 11.94 10.62 11.885C11.0067 11.7517 11.41 11.6433 11.8133 11.5733C13.79 11.24 15.6783 11.5817 17.1583 12.6067C17.2933 12.7 17.3183 12.8867 17.225 13.0217C17.1317 13.1567 16.945 13.1817 16.81 13.0883C16.74 13.0767 16.6683 13.065 16.6 13.0533ZM17.8067 10.8517C16.1683 9.71 13.695 9.31 11.485 9.705C11.025 9.785 10.57 9.9 10.135 10.04C9.94167 10.1017 9.74 9.99834 9.68167 9.80334C9.62334 9.60834 9.73 9.40667 9.925 9.34667C10.42 9.195 10.9333 9.06334 11.455 8.97334C13.9533 8.53 16.7483 8.98667 18.6333 10.3333C18.7783 10.4417 18.8217 10.645 18.715 10.7917C18.65 10.8883 18.55 10.935 18.4483 10.935C18.385 10.935 18.3217 10.92 18.2633 10.8883C18.11 10.8767 17.9583 10.865 17.8067 10.8517Z" />
            </svg>
            Connect with Spotify
          </Button>
        </>
      ) : (
        <div className="flex flex-col items-center space-y-2">
          <div className="bg-green-50 text-green-700 rounded-lg py-2 px-4 text-sm flex items-center">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Connected to Spotify
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-muted-foreground hover:text-destructive"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default SpotifyAuth;
