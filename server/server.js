const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  console.log("hi");
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "43bd539785024e6ea2db929033117b78",
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });
  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      console.log(data.body);
      res.json({
        accessToken: data.body.accesstoken,
        expiresIn: data.body.expiresin,
      });
    })
    .catch((err) => {
      console.log("Could not refresh access token", err);
    });
});
app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "43bd539785024e6ea2db929033117b78",
    clientSecret: process.env.CLIENT_SECRET,
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`connection establishde at ${PORT}`);
});
