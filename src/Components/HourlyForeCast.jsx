import React, { useEffect, useState } from "react";
import "./HourlyForeCast.css";
const HourlyForeCast = ({ hourlyForecast, setHourlyForecast }) => {
  const [data, setData] = useState(null);
  function fetchData() {
    setData(hourlyForecast.list);
    return data;
  }
  function formatDate(data) {
    let date = new Date(data.split(" ")[0]);
    let date2 = date.toString().split(" ");
    let resDate = [];
    for (let i = 0; i < 3; i++) resDate.push(date2[i]);
    console.log(resDate);
    return resDate[2] + " " + resDate[0] + ", " + resDate[1];
  }
  useEffect(() => {
    fetchData();
  });
  return (
    <div>
      <h2 style={{ textAlign: "center", color: "white" }}>HOURLY FORECAST</h2>
      <div className="hourlyCast">
        {data &&
          data.map((ele, key) => {
            return key < 8 ? (
              <div key={key} className="detailsCard">
                <div className="date">{formatDate(ele.dt_txt)}</div>
                <div className="time">{ele.dt_txt.split(" ")[1]}</div>
                <img
                  src={`http://openweathermap.org/img/wn/${ele.weather[0].icon}@2x.png`}
                  className="icon"
                  alt=""
                />
                <div className="condition">{ele.weather[0].main}</div>
                <div className="humidity">
                  Humidity
                  <div>{ele.main.humidity} %</div>
                </div>
              </div>
            ) : (
              ""
            );
          })}
      </div>
    </div>
  );
};

export default HourlyForeCast;
