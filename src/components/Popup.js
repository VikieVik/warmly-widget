import React from "react";
import "../style.css";

export function Popup(props) {
  var popupMessages = props.chats;

  return (
    <React.Fragment>
      <div id="popup-container">
        {/** render only agent messages as popups */}
        {popupMessages.map((popupMessage, index) => {
          if (popupMessage.author !== "user") {
            return <PopupBubble chat={popupMessage.content} key={index} />;
          }
        })}
      </div>
    </React.Fragment>
  );
}

//Popup bubble component
function PopupBubble(props) {
  return <div id="popup-bubble">{props.chat}</div>;
}
