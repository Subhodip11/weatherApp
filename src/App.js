import "./App.css";
import React, { useEffect, useState } from "react";
import HourlyForeCast from "./Components/HourlyForeCast";
import HumidityWindDetail from "./Components/HumidityWindDetail";

function App() {
  const [icon, setIcon] = useState("");
  const [weatherStatus, setWeatherStatus] = useState({
    icon: "",
    temp: "",
    maxTemp: "",
    minTemp: "",
    lName: "",
    weatherCondition: "",
    humidity: "",
    windSpeed: "",
  });
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const apiKey = "807f589e391aa37b63d137aef2ec5cb6";

  async function fecthdata() {
    let locationName = "chennai";
    const apiCall = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        locationName +
        "&appid=" +
        apiKey
    );
    const response = await apiCall.json();
    const data = await response;
    // console.log(data.weather[0].icon);
    setIcon(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    console.log(data);
    setWeatherStatus({
      icon: icon,
      temp: Math.round(data.main.temp - 274.15),
      maxTemp: (data.main.temp_max - 274.15).toFixed(2),
      minTemp: (data.main.temp_min - 274.15).toFixed(2),
      lName: data.name,
      weatherCondition: data.weather[0].main,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    });
    return data.id;
  }
  async function fetchHourlyForeCast(locationId) {
    // let locationName = "chennai";
    const apiString =
      "http://api.openweathermap.org/data/2.5/forecast?id=" +
      locationId +
      "&appid=" +
      apiKey;
    const apiCall = await fetch(apiString);
    const response = await apiCall.json();
    const data = await response;
    console.log(data);
    setHourlyForecast(data);
  }
  useEffect(() => {
    try {
      async function Data() {
        const LID = await fecthdata();
        fetchHourlyForeCast(LID);
      }
      Data();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <div className="container">
        <div className="weatherContainer">
          <div className="weatherCondition">
            <div className="name">{weatherStatus.lName}</div>

            <div className="cloudDetail">
              <img src={icon} alt="" style={{ width: "5rem" }} />
              <div style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
                {weatherStatus.temp} &#8451;
              </div>
            </div>

            <div className="condition">{weatherStatus.weatherCondition}</div>
            <div className="details">
              <HumidityWindDetail
                weatherText="Humidity"
                weatherValue={weatherStatus.humidity + "%"}
              />
              <HumidityWindDetail
                weatherText="Wind Speed"
                weatherValue={weatherStatus.windSpeed + "km/j"}
              />
            </div>
          </div>

          <HourlyForeCast
            hourlyForecast={hourlyForecast}
            setHourlyForecast={setHourlyForecast}
          />
        </div>
      </div>
    </>
  );
}

export default App;
