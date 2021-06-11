const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();
app.post("/", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "43bd539785024e6ea2db929033117b78",
    clientSecret: "fb8d216281244b35bddfbb354e61bad3",
  });
  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});
