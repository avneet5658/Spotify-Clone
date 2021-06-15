import debounce from "lodash.debounce";
import useAuth from "./useAuth";
import { Container, Form } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";
import Player from "./Player";

const spotifyApi = new SpotifyWebApi({
  clientId: "43bd539785024e6ea2db929033117b78",
});
const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState("");
  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
  }
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  const debounceSave = useCallback(
    debounce((searc) => {
      console.log(searc);
      spotifyApi
        .searchTracks(searc)
        .then((data) => {
          console.log(data);
          setSearchResults(
            data.body.tracks.items.map((track) => {
              const smallestAlbumImage = track.album.images.reduce(
                (smallest, image) => {
                  if (image.height < smallest.height) return image;
                  return smallest;
                },
                track.album.images[0]
              );
              return {
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumUrl: smallestAlbumImage.url,
              };
            })
          );
        })
        .catch((err) => console.log(err));
    }, 700),
    []
  );

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    debounceSave(search);
  }, [search, accessToken]);
  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <Form.Control
        type="search"
        placeholder="Search songs/Artist"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 py-2" style={{ overflowY: "auto" }}>
        {searchResult.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </Container>
  );
};

export default Dashboard;
