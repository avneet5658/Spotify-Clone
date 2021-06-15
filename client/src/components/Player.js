// import SpotifyPlayer from "react-spotify-web-playback";
// import ReactPlayer from "react-player";
import ReactAudioPlayer from "react-audio-player";

const Player = ({ accessToken, trackUri }) => {
  if (!accessToken) return null;
  return <ReactAudioPlayer src={trackUri} autoPlay controls />;
};

export default Player;
