import React, { useEffect, useState } from "react";
import "./HourlyForeCast.css";
const HourlyForeCast = ({ hourlyForecast, setHourlyForecast }) => {
  const [data, setData] = useState(null);
  function fetchData() {
    setData(hourlyForecast.list);
  }
  useEffect(() => {
    fetchData();
  });
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>HOURLY FORECAST</h2>
      <div className="hourlyCast">
        {data &&
          data.map((ele, key) => {
            return (
              <div key={key} className="detailsCard">
                <div className="time">{ele.dt_txt.split(" ")[1]}</div>
                <div className="condition">{ele.weather[0].main}</div>
                <img
                  src={`http://openweathermap.org/img/wn/${ele.weather[0].icon}@2x.png`}
                  className="icon"
                  alt=""
                />
                <div className="humidity">
                  Humidity
                  <div>{ele.main.humidity} %</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HourlyForeCast;
