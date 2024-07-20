import { useEffect, useState } from "react";
import utils from "../services/utils";

const api_key = import.meta.env.VITE_SOME_KEY; 

const WeatherData = ({city, lat, lon}) => {
    const [weatherData, setWeatherData] = useState(null);

    // console.log(api_key)
    const baseURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`

    useEffect(() => {
        console.log('useEffect in WeatherData');
        utils.get(baseURL)
            .then(weatherInfo => {
                console.log(weatherInfo);
                setWeatherData({
                    status: true,
                    temperature: weatherInfo.main.temp,
                    wind: weatherInfo.wind.speed,
                    icon: `https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`
                });
            })
            .catch(error => {
                console.log(error);
                setWeatherData({ status: false });
            });
    }, [city]);

    if (!weatherData) 
        return null;
    if (!weatherData.status)
        return (
            <div>
                <h2>Weather in {city}</h2>
                Failed to fetch weather data for {city}
            </div>
        );

    return (
        <div>
            <h2>Weather in {city}</h2>
            temperature {weatherData.temperature} Celcius
            <br />
            <img src={weatherData.icon} alt={`current weather in ${city}`} />
            <br />
            wind {weatherData.wind} m/s
        </div>
    );
};

export default WeatherData;