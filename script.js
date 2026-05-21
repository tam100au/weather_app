const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";
const FEEDBACK = document.getElementById("feedback");
const FORM = document.getElementById("weather-form");
const RESULT_SECTION = document.getElementById("result");
const LOCATION_NAME = document.getElementById("location-name");
const WEATHER_CONDITION = document.getElementById("weather-condition");
const WEATHER_ICON = document.getElementById("weather-icon");
const TEMPERATURE = document.getElementById("temperature");
const HUMIDITY = document.getElementById("humidity");
const WIND_SPEED = document.getElementById("wind-speed");

/**
 * Display a text message to the user.
 * @param {string} message
 * @param {boolean} isError
 */
function showFeedback(message, isError = false) {
  FEEDBACK.textContent = message;
  FEEDBACK.style.color = isError ? "#d14343" : "#5b6369";
}

/**
 * Build the OpenWeatherMap API URL with query parameters.
 * @param {string} city
 * @param {string} country
 * @returns {string}
 */
function buildApiUrl(city, country) {
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  const params = new URLSearchParams({
    q: `${city.trim()},${country.trim()}`,
    units: "metric",
    appid: API_KEY,
  });
  return `${baseUrl}?${params}`;
}

/**
 * Render weather details on the page.
 * @param {object} data
 */
function renderWeather(data) {
  const { name, main, weather, wind, sys } = data;
  const weatherItem = weather[0] || {};

  LOCATION_NAME.textContent = `${name}, ${sys?.country || ""}`.trim();
  WEATHER_CONDITION.textContent = weatherItem.description
    ? weatherItem.description.replace(/\b\w/g, (char) => char.toUpperCase())
    : "Unknown";
  TEMPERATURE.textContent = `${Math.round(main.temp)}°C`;
  HUMIDITY.textContent = `${main.humidity}%`;
  WIND_SPEED.textContent = `${Math.round(wind.speed)} m/s`;

  if (weatherItem.icon) {
    WEATHER_ICON.src = `https://openweathermap.org/img/wn/${weatherItem.icon}@2x.png`;
    WEATHER_ICON.alt = weatherItem.description || "Weather icon";
    WEATHER_ICON.classList.remove("hidden");
  } else {
    WEATHER_ICON.classList.add("hidden");
  }

  RESULT_SECTION.classList.remove("hidden");
}

/**
 * Fetch weather data from OpenWeatherMap.
 * @param {string} city
 * @param {string} country
 */
async function fetchWeather(city, country) {
  if (!API_KEY || API_KEY === "YOUR_OPENWEATHERMAP_API_KEY") {
    throw new Error(
      "Please add your OpenWeatherMap API key to the API_KEY constant in script.js."
    );
  }

  const url = buildApiUrl(city, country);
  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.message || response.statusText || "Unable to load weather.";
    throw new Error(message);
  }

  const weatherData = await response.json();
  return weatherData;
}

FORM.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = FORM.city.value.trim();
  const country = FORM.country.value.trim();

  if (!city || !country) {
    showFeedback("Please enter both city and country.", true);
    RESULT_SECTION.classList.add("hidden");
    return;
  }

  showFeedback("Loading weather...");
  RESULT_SECTION.classList.add("hidden");

  try {
    const data = await fetchWeather(city, country);
    renderWeather(data);
    showFeedback("Weather updated.");
  } catch (error) {
    showFeedback(error.message || "Network error. Please try again.", true);
  }
});
