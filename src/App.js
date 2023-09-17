import React, { useState } from "react";
import "./App.css";
import searchIcon from "./reactapp3pictures/search-icon.jpg";
import rain from "./reactapp3pictures/rain-icon1.png";
import wind from "./reactapp3pictures/wind.png";
import humidity from "./reactapp3pictures/humidity.png";

export default function App() {
  const [inputCity, setInputCity] = useState(""); // New state for input
  const [weatherData, setWeatherData] = useState(true); // Initialize as null
  const[defaultState, setDefaultState] =useState({
    temperature: "",
    humidity: "",
    wind: "",
    name: ""
  })

  function defaultWeather(){
    const apiKey = "2ad20fc5151adeb8264139d8c137a54b"; // Your API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=lagos&appid=${apiKey}`;

    fetch(apiUrl)
    .then((res => res.json()))
    .then(data => setDefaultState(preData =>({
      ...preData,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      name: data.name
    })))

  }

 

  function fetchWeatherData(city) {
    const apiKey = "2ad20fc5151adeb8264139d8c137a54b"; // Your API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === 200) {
          setWeatherData({
            wind: data.wind.speed,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            name: data.name,
          });
        } else {
          // Handle case where city doesn't exist
          return
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  

  React.useEffect(()=>{
    defaultWeather()

  }, [])

  function handleSubmit(event) {
    event.preventDefault();

    if (inputCity !== "") {
      fetchWeatherData(inputCity);
    }
  }

  return (
    <div className="card">
      <div className="search">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter city name"
            spellCheck="false"
            onChange={(event) => setInputCity(event.target.value)}
            value={inputCity}
          />
          <button type="submit">
            <img src={searchIcon} alt="Search" />
          </button>
        </form>
      </div>
      {weatherData && (
        <div className="weather">
          <img src={rain} className="weather-icon" alt="Rain Icon" />
          <h1 className="temp">{Math.round(weatherData.temperature || defaultState.temperature)} °C</h1>
          <h2 className="city">{weatherData.name || defaultState.name}</h2>
          <div className="details">
            <div className="col">
              <img src={humidity} alt="Humidity Icon" />
              <div>
                <p className="humidity">{weatherData.humidity || defaultState.humidity}</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src={wind} alt="Wind Icon" />
              <div>
                <p className="wind">{weatherData.wind || defaultState.wind}/ hr</p>
                <p>Wind speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
