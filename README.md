# WEATHERLY

WEATHERLY is a lightweight, static weather lookup app built with HTML, CSS, and vanilla JavaScript. It uses the OpenWeatherMap API to display current weather conditions for any city and country.

## Files

- `index.html` — app structure and layout
- `styles.css` — minimalist responsive styling
- `script.js` — client-side weather fetching and UI updates

## Setup

1. Obtain a free API key from OpenWeatherMap: https://openweathermap.org/api
2. Open `script.js` and replace `YOUR_OPENWEATHERMAP_API_KEY` with your API key.
3. Open `index.html` in a browser to run the app locally.

## How to use

- Enter a city name and country code (for example `Sydney` and `AU`).
- Click **Get Weather**.
- The app shows the location, temperature, condition, humidity, wind speed, and a matching icon.

## Deployment to GitHub Pages

1. Push the repository to GitHub.
2. In the repository settings, enable GitHub Pages for the `main` branch (or the branch you prefer).
3. Select the root folder `/` as the publishing source.
4. Visit the provided GitHub Pages URL.

## API key security note

This app is fully static, so the API key must be included in the client-side code. Do not commit a private API key to a public repository. Use a free-tier OpenWeatherMap key with domain restrictions if possible, or keep the repository private if you need to protect your key.
