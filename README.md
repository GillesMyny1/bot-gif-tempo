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

### Spotify Developer App

   To create your app in Spotify Developer at `https://developer.spotify.com/dashboard`, hit `Create App`, fill in required informatation.
   1. Name the app
   2. Describe the app
   3. Redirect URIs must contain `http://localhost:3000/callback` when running this locally.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/GillesMyny1/bot-gif-tempo.git
   cd bot-gif-tempo

2. **Install Dependencies**

   Navigate to the project directory and install the necessary dependencies:

   ```bash
   npm install

4. **Initial Startup**

   Start the server for the first time by running:

   ```bash
   npm start <CLIENT_ID> <CLIENT_SECRET> <REDIRECT_URI>

5. **Following Startups**

   After you've started the server and the `.env` file was setup, you can start the server by running:

   ```bash
   npm start

5. **Authorize Spotify**

   The application will be available at `http://localhost:3000`. Open this URL in your web browser to interact with the app.

   Authorize the app to fetch your token and begin fetching the tempo of your currently played song.

6. **OBS Connection**

   In OBS, add Browser source, in the `URL` field enter `http://localhost:3000`, in the `Width` and `Height` fields enter a comfortable size (i.e. 800px 600px) and hit `OK`.

   You can then resize the Browser source holding `Alt` on your keyboard to ensure only the animated sprite is visible.

## Customization

### Adding Custom Sprite Map

Visit `https://ezgif.com/gif-to-sprite` with and to convert your GIF to a Sprite Map. 
Make sure to select the following options:
   - Stack vertically
   - No margin around outside
   - Optional: Enter custom tile size

Download and move your custom sprite map into the `/public/` directory.

### Sprite Map

- The sprite map `nodders.png` should be a vertical sprite map (frames stacked vertically) with no margin between frames.
- Make note of the following items:
   - Sprite Map Name (.png)
   - Sprite Map Width (px)
   - Sprite Map Height (px)
   - Single Frame Width (px)
   - Single Frame Height (px)
   - Sprite Animation Frame Count (int)

### CSS

In `styles.css` please change the respective commented lines in `#sprite` to your specific sprite map name, dimensions, and frame count.
Additionally, under `@keyframes playSprite` change the `to` CSS background-position to the negative value of your Sprite Map Height (px).
