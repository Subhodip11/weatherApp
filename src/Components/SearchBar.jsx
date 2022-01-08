import React from "react";
import "./SearchBar.css";
const SearchBar = (props) => {
  return (
    <div>
      <div className="inputBar" style={{ zIndex: props.zIndex }}>
        <input id="inputTag" type="text" placeholder="Enter City Name" />
        <button
          type="submit"
          onClick={() => {
            props.setInputVal(() => document.getElementById("inputTag").value);
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
