const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
const port = 3000;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

let accessToken = '';
let refreshToken = '';
let tokenExpiry = 0;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', (req, res) => {
  const scopes = 'user-read-playback-state';
  const spotifyAuthUrl = 'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scopes,
      redirect_uri: REDIRECT_URI,
    });
  res.redirect(spotifyAuthUrl);
});

app.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  if (!code) {
    return res.send('No code provided');
  }

  try {
    const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const { access_token, refresh_token: newRefreshToken, expires_in } = tokenResponse.data;
    accessToken = access_token;
    refreshToken = newRefreshToken;
    tokenExpiry = Date.now() + (expires_in * 1000);

    console.log('Access token acquired:', accessToken); // Debug log

    res.redirect('/'); // Redirect to home page or any other page after successful authentication
  } catch (error) {
    console.error('Error exchanging code for tokens:', error.response ? error.response.data : error.message);
    res.send('Error retrieving tokens');
  }
});

app.get('/refresh_token', async (req, res) => {
  try {
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const { access_token, expires_in } = tokenResponse.data;
    accessToken = access_token;
    tokenExpiry = Date.now() + (expires_in * 1000);

    console.log('Access token refreshed:', accessToken); // Debug log

    res.json({ access_token, expires_in });
  } catch (error) {
    console.error('Error refreshing token:', error.response ? error.response.data : error.message);
    res.send('Error refreshing token');
  }
});

// Middleware to check token expiry and refresh if needed
app.use(async (req, res, next) => {
  if (Date.now() > tokenExpiry - 60 * 1000) { // Refresh 1 minute before expiry
    try {
      await refreshAccessToken();
    } catch (error) {
      console.error('Error refreshing token in middleware:', error.message);
    }
  }
  console.log('Access token available:', accessToken); // Debug log
  next();
});

// Function to refresh access token
async function refreshAccessToken() {
  try {
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const { access_token, expires_in } = tokenResponse.data;
    accessToken = access_token;
    tokenExpiry = Date.now() + (expires_in * 1000);

    console.log('Access token refreshed:', accessToken); // Debug log
  } catch (error) {
    console.error('Error refreshing token:', error.response ? error.response.data : error.message);
  }
}

async function getTrackTempo() {
    if (!accessToken) {
      throw new Error('Access token not available');
    }
  
    try {
      // Spotify API endpoint to get the current playback state
      const playbackStateResponse = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
  
      console.log('Playback state response:', playbackStateResponse.data); // Debug log
  
      if (playbackStateResponse.data && playbackStateResponse.data.item) {
        const trackId = playbackStateResponse.data.item.id;
  
        // Spotify API endpoint to get track details
        const trackResponse = await axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
  
        console.log('Track response:', trackResponse.data); // Debug log
  
        // Attempt to get tempo from the available data
        const tempo = trackResponse.data.tempo || 'Tempo data not available';
        
        console.log('Track tempo:', tempo); // Debug log
        return tempo;
      } else {
        throw new Error('No track currently playing');
      }
    } catch (error) {
      console.error('Error fetching track tempo:', error.response ? error.response.data : error.message);
      throw new Error('Failed to fetch track tempo');
    }
  }
  
app.get('/api/tempo', async (req, res) => {
    try {
        const tempo = await getTrackTempo();
        res.json({ tempo });
    } catch (error) {
        console.error('Error in /api/tempo:', error.message);
        res.status(500).send('Error fetching track tempo');
    }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});