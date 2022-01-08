import "./App.css";
import React, { useEffect, useState } from "react";
import HourlyForeCast from "./Components/HourlyForeCast";
import HumidityWindDetail from "./Components/HumidityWindDetail";
import SearchBar from "./Components/SearchBar";
import ErrorMssg from "./Components/ErrorMssg";
import DayToDayForeCast from "./Components/DayToDayForeCast.";
import ClearSky from "./images/clear_sky.jpg";
import FewClouds from "./images/few_clouds.jpg";
import Clouds from "./images/clouds.jpg";
import Mist from "./images/mist.jpg";
import Haze from "./images/hazeDay.jpg";
import Rainy from "./images/rainyDay.jpg";
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
  const [mssgVisibility, setMssgVisibility] = useState(true);
  const [dailyForeCast, setDailyForeCast] = useState("");
  const [bgImage, setBgImage] = useState(ClearSky);
  async function fecthdata() {
    console.log("Entered Into FetchData");
    // let locationName = "chennai";
    const apiCall = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        searchedContent +
        "&appid=" +
        apiKey
    );
    const response = await apiCall.json();
    const data = await response;
    // console.log(data);
    // console.log(data.weather[0].icon);
    if (data.cod === 200) {
      setIcon(
        `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );
      // console.log(data);
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
      // console.log(weatherStatus);
      setStatusCodeCheck({ cod: data.cod, mssg: data.message });
      if (data.weather[0].main.toString().toLowerCase() === "clear")
        setBgImage(ClearSky);
      if (data.weather[0].main.toString().toLowerCase() === "clouds")
        setBgImage(Clouds);
      if (data.weather[0].main.toString().toLowerCase() === "mist")
        setBgImage(Mist);
      if (data.weather[0].main.toString().toLowerCase() === "haze")
        setBgImage(Haze);
      if (data.weather[0].main.toString().toLowerCase().includes("rain"))
        setBgImage(Rainy);
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
    // console.log(data);
    setHourlyForecast(data);
  }

  async function fetchDailyForeCast(locationId) {
    const apiString =
      "http://api.openweathermap.org/data/2.5/forecast?id=" +
      locationId +
      "&appid=" +
      apiKey;
    const apiCall = await fetch(apiString);
    const response = await apiCall.json();
    const data = await response;
    console.log("Daily Forecast");
    console.log(data);
    setDailyForeCast(data);
  }
  setTimeout(() => {
    setTime(new Date().toTimeString().split(" ")[0]);
  }, 1000);
  useEffect(() => {
    async function Data() {
      const LID = await fecthdata();
      fetchHourlyForeCast(LID);
      fetchDailyForeCast(LID);
    }
    Data();
    setMssgVisibility(true);
  }, [searchedContent]);
  return (
    <>
      <img src={bgImage} alt="" className="bgImage" />
      <div className="container">
        {statusCodeCheck.cod !== 200
          ? mssgVisibility && (
              <ErrorMssg
                code={statusCodeCheck.cod}
                mssg={statusCodeCheck.mssg}
                color="#FEEFB3"
                textColor="#9F6000"
                setMssgVisibility={setMssgVisibility}
                zIndex={3}
              />
            )
          : mssgVisibility && (
              <ErrorMssg
                code=""
                mssg="Data Fetched Succesfully"
                color="#DFF2BF"
                textColor="#4F8A10"
                setMssgVisibility={setMssgVisibility}
                zIndex={3}
              />
            )}
        <div className="inputBar">
          <SearchBar
            inputVal={searchedContent}
            setInputVal={setSearchedContent}
            zIndex={3}
          />
        </div>
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
        <DayToDayForeCast
          dailyForeCast={dailyForeCast}
          setDailyForeCast={setDailyForeCast}
        />
      </div>
    </>
  );
}

export default App;
