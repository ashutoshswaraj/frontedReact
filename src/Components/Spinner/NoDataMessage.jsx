// NoToursMessage.js

import React from "react";
import "./Nodatamessage.css"; // Import the CSS file
import sadGif from "../../img/sad.gif";

const NoDataMessage = (props) => {
  return (
    <div className="no-tours-message-wrapper">
      <div className="no-tours-message-container">
        <img className="sad-face" src={sadGif} alt="Sad face" />
        <h1 className="no-tours-message">{props.data}</h1>
        <p>Explore our amazing tours and start your adventure!</p>
      </div>
    </div>
  );
};

export default NoDataMessage;
