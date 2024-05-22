import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent {
  city: string = '';
  weather: any;

  constructor(private weatherService: WeatherService) {}

  getWeather() {
    this.weatherService.getWeather(this.city).subscribe(
      (data) => {
        this.weather = data;
      },
      (error) => {
        console.error('Error fetching weather data', error);
      }
    );
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.weatherService
          .getWeatherByCoordinates(latitude, longitude)
          .subscribe(
            (data) => {
              this.weather = data;
              this.city = data.name;
            },
            (error) => {
              console.error('Error fetching weather data', error);
            }
          );
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
  getWeatherIconDescription(weatherMain: string): string {
    switch (weatherMain) {
      case 'Clear':
        return 'Clear Sky';
      case 'Clouds':
        return 'Cloudy';
      case 'Rain':
        return 'Rainy';
      case 'Drizzle':
        return 'Drizzling';
      case 'Thunderstorm':
        return 'Thunderstorm';
      case 'Snow':
        return 'Snowy';
      default:
        return 'Weather';
    }
  }
}
