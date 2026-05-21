import os
import sys

import requests


def get_api_key() -> str:
    """Retrieve the OpenWeatherMap API key from environment variables."""
    api_key = os.getenv("OPENWEATHER_API_KEY")
    if not api_key:
        raise EnvironmentError(
            "Missing environment variable OPENWEATHER_API_KEY. "
            "Please configure it before running this script."
        )
    return api_key


def fetch_weather(api_key: str) -> dict:
    """Call the OpenWeatherMap current weather endpoint for Sydney, AU."""
    url = "https://api.openweathermap.org/data/2.5/weather"
    params = {
        "q": "Sydney,AU",
        "appid": api_key,
        "units": "metric",
    }

    response = requests.get(url, params=params, timeout=10)
    response.raise_for_status()

    data = response.json()
    if "main" not in data or "weather" not in data:
        raise ValueError("Unexpected API response structure.")
    return data


def format_weather(data: dict) -> str:
    """Format the weather data into a human-readable string."""
    temperature = data["main"].get("temp")
    weather_conditions = data["weather"]

    if temperature is None or not weather_conditions:
        raise ValueError("Weather data is incomplete.")

    condition_text = weather_conditions[0].get("description", "Unknown condition")
    return (
        f"Sydney, Australia weather:\n"
        f"Temperature: {temperature:.1f} °C\n"
        f"Conditions: {condition_text.capitalize()}"
    )


def main() -> int:
    """Main entry point for the weather script."""
    try:
        api_key = get_api_key()
        weather_data = fetch_weather(api_key)
        message = format_weather(weather_data)
        print(message)
        return 0

    except EnvironmentError as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1
    except requests.RequestException as exc:
        print(f"Network error while retrieving weather: {exc}", file=sys.stderr)
        return 1
    except ValueError as exc:
        print(f"Error parsing weather response: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
