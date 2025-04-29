import React from "react";

const Loader = () => {
  return (
    <div className="fullscreen-loader">
      <div className="loader">
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="logo">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default Loader;
