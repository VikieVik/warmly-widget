require("file-loader?name=[name].[ext]!./index.html");
import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { App } from "./App.js";
import { config } from "./config";
import { readCookie, createCookie, generateUUID } from "./utils.js";
import { startLiveSession } from "./session.js";

// globle window funtion can be accessed from anywhere in the browser
window.fusionChat = function (customConfig) {
  //console.log("fusion chat intialized");

  // org token
  let token = customConfig.token,
    baseUrl = customConfig.baseUrl;

  //setup system config
  //save config passed by user to local config
  config.baseUrl = customConfig.baseUrl || config.baseUrl;
  config.token = customConfig.token;
  config.title = customConfig.title;
  config.subtitle = customConfig.subtitle;
  config.primaryColor = customConfig.primaryColor;
  config.agentAvailableText = customConfig.agentAvailableText;
  config.agentUnavailableText = customConfig.agentAvailableText;
  config.showAgentAvailability = customConfig.agentAvailableText;
  config.requireEmailUpfront = customConfig.requireEmailUpfront;
  config.agentUnavailableText = customConfig.showAgentAvailability;
  config.iconStyle = customConfig.iconStyle;

  // get user_id saved in cookies, if no user_id create one
  let fusionSavedCookie = readCookie(`fusion_${token}`);
  if (fusionSavedCookie === null) {
    let visitorUserId = generateUUID();
    createCookie(`fusion_${token}`, `${visitorUserId}`, 730);
  }
  let decodedUserId = decodeURIComponent(fusionSavedCookie);
  config.userId = decodedUserId;

  //start live session before widget
  startLiveSession({ token, baseUrl });

  //create a div, insert into body of client website
  const newElement = document.createElement("div");
  newElement.setAttribute("id", `app_${token}`);
  document.body.appendChild(newElement);

  //use above created div & inject widget UI in client website
  const appElement = document.getElementById(`app_${token}`);
  ReactDOM.render(<App config={customConfig} />, appElement);
};
