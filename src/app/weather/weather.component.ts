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

  getWeatherIcon(condition: string): string {
    const iconMap: { [key: string]: string } = {
      Clear: 'wi wi-day-sunny',
      Clouds: 'wi wi-cloudy',
      Rain: 'wi wi-rain',
      Drizzle: 'wi wi-sprinkle',
      Thunderstorm: 'wi wi-thunderstorm',
      Snow: 'wi wi-snow',
      Mist: 'wi wi-fog',
      Smoke: 'wi wi-smoke',
      Haze: 'wi wi-day-haze',
      Dust: 'wi wi-dust',
      Fog: 'wi wi-fog',
      Sand: 'wi wi-sandstorm',
      Ash: 'wi wi-volcano',
      Squall: 'wi wi-strong-wind',
      Tornado: 'wi wi-tornado',
    };

    return iconMap[condition] || 'wi wi-na';
  }
}
