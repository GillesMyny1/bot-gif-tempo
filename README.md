# Spotify Tempo Sprite Animation

This web application fetches the current tempo of the track playing on Spotify and displays it using an animated sprite. The sprite animation adjusts its frame duration based on the tempo, providing a visual representation of the beat.

## Features

- **Spotify Authentication**: Users can log in with their Spotify account to fetch tempo data.
- **Tempo-Based Animation**: The animated sprite adjusts its frame duration based on the tempo of the currently playing track.
- **Responsive Design**: The application is centered on the screen with properly aligned elements.
- **OBS Compatible**: The animated sprite can be pulled into OBS using a Browser source with a few clicks.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- A Spotify Developer account with a registered application to obtain the `CLIENT_ID`, `CLIENT_SECRET`, and `REDIRECT_URI`.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/GillesMyny1/bot-gif-tempo.git
   cd bot-gif-tempo

2. **Install Dependencies**

   Navigate to the project directory and install the necessary dependencies:

   ```bash
   npm install

3. **Update Environment Variables**

   In the provided .env file, replace `your_spotify_client_id` and `your_spotify_client_secret` with your unique credentials provided by Spotify.

4. **Start the Server**

   Start the server by running:

   ```bash
   npm start

5. **Authorize Spotify**

   The application will be available at `http://localhost:3000`. Open this URL in your web browser to interact with the app.

   Authorize the app to fetch your token and begin fetching the tempo of your currently played song.

6. **OBS Connection**

   In OBS, add Browser source, in the `URL` field enter `http://localhost:3000`, in the `Width` and `Height` fields enter a comfortable size (i.e. 800px 600px) and hit `OK`.

   You can then resize the Browser source holding `Alt` on your keyboard to ensure only the animated sprite is visible.
