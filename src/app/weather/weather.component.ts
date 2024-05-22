import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  city: string = 'New York'; // Default city
  weather: any;
  error: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather(): void {
    this.weatherService.getWeather(this.city).subscribe(
      (data) => {
        this.weather = data;
        this.error = '';
      },
      (error) => {
        console.error('Error fetching weather data', error);
        this.error = 'Error fetching weather data';
      }
    );
  }

  onCityChange(newCity: string): void {
    this.city = newCity;
    this.getWeather();
  }
}
