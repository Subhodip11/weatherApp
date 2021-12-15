import "./App.css";
import React, { useEffect, useState } from "react";
import HourlyForeCast from "./Components/HourlyForeCast";
import HumidityWindDetail from "./Components/HumidityWindDetail";
import SearchBar from "./Components/SearchBar";
import ErrorMssg from "./Components/ErrorMssg";
function App() {
  const [time, setTime] = useState(new Date().toTimeString().split(" ")[0]);
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
  const [searchedContent, setSearchedContent] = useState("kolkata");
  const [statusCodeCheck, setStatusCodeCheck] = useState({ cod: "", mssg: "" });
  const apiKey = "807f589e391aa37b63d137aef2ec5cb6";

  async function fecthdata() {
    let locationName = "chennai";
    const apiCall = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        searchedContent +
        "&appid=" +
        apiKey
    );
    const response = await apiCall.json();
    const data = await response;
    console.log(data);
    // console.log(data.weather[0].icon);
    if (data.cod === 200) {
      setIcon(
        `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );
      console.log(data);
      setWeatherStatus({
        id: data.id,
        icon: icon,
        temp: Math.round(data.main.temp - 274.15),
        maxTemp: (data.main.temp_max - 274.15).toFixed(2),
        minTemp: (data.main.temp_min - 274.15).toFixed(2),
        lName: data.name,
        weatherCondition: data.weather[0].main,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      });
      console.log(weatherStatus);
      setStatusCodeCheck({ cod: data.cod, mssg: data.message });
      return data.id;
    } else {
      setWeatherStatus(weatherStatus);
      setStatusCodeCheck({ cod: data.cod, mssg: data.message });
      return weatherStatus.id;
    }
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
  setTimeout(() => {
    setTime(new Date().toTimeString().split(" ")[0]);
  }, 1000);
  useEffect(() => {
    async function Data() {
      const LID = await fecthdata();
      fetchHourlyForeCast(LID);
    }
    Data();
  }, [searchedContent]);
  return (
    <>
      <div className="container">
        {statusCodeCheck.cod !== 200 ? (
          <ErrorMssg
            code={statusCodeCheck.cod}
            mssg={statusCodeCheck.mssg}
            color="rgba(255,255,0,0.4)"
          />
        ) : (
          <ErrorMssg code="" mssg="" color="white" />
        )}
        <SearchBar
          inputVal={searchedContent}
          setInputVal={setSearchedContent}
        />
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
            <div className="date">
              {new Date().toTimeString().split(" ")[0]}&nbsp;,
              {new Date().toDateString()}
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
