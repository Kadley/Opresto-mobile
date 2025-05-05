import { weatherCodes } from './../../../data/weatherCode';
import { RESTDataSource } from '@apollo/datasource-rest';

export interface WeatherAPIResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentUnits;
  current: Current;
  daily_units: DailyUnits;
  daily: Daily;
}

export interface CurrentUnits {
  time: string;
  interval: string;
  temperature_2m: string;
}

export interface Current {
  time: string;
  interval: number;
  temperature_2m: number;
}

export interface DailyUnits {
  time: string;
  weather_code: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  sunrise: string;
  sunset: string;
}

export interface Daily {
  time: string[];
  weather_code: (keyof typeof weatherCodes)[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
}

export class WeatherAPI extends RESTDataSource {
  override baseURL = 'https://api.open-meteo.com/v1/';

  async getWeather(latitude: string, longitude: string) {
    const data = await this.get<WeatherAPIResponse>('forecast', {
      params: {
        latitude,
        longitude,
        daily:
          'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset',
        current: 'temperature_2m',
        timezone: 'Europe/Berlin',
        forecast_days: '1',
      },
    });

    // On va transformer les données pour qu'elles soient plus faciles à utiliser
    return {
      latitude: data.latitude,
      longitude: data.longitude,
      currentTemperature: data.current.temperature_2m,
      // On ne récupère que le premier jour, donc le premier élément du tableau
      time: data.daily.time[0],
      weatherCode: data.daily.weather_code[0],
      weatherCodeDescription: weatherCodes[data.daily.weather_code[0]],
      temperatureMax: data.daily.temperature_2m_max[0],
      temperatureMin: data.daily.temperature_2m_min[0],
      sunrise: data.daily.sunrise[0],
      sunset: data.daily.sunset[0],
    };
  }
}
