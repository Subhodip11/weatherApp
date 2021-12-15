import React from "react";

const SearchBar = (props) => {
  return (
    <div>
      <div className="inputBar">
        <input id="inputTag" type="text" placeholder="Enter Location Name" />
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
