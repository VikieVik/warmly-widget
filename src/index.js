require("file-loader?name=[name].[ext]!./index.html");
import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { App } from "./App.js";
import { config } from "./config";
import { readCookie } from "./utils.js";

console.log("Index");

// globle window funtion can be accessed from anywhere in the browser
window.chatInit = function (customConfig) {
  console.log("Index-1");

  console.log("fusion chat intialized");

  // org token

  //setup system config
  let token = customConfig.token;

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

  let fusionSavedCookie = readCookie(`fusion_${token}`);
  let decodedCookie = JSON.parse(decodeURIComponent(fusionSavedCookie));
  console.log(decodedCookie);

  config.userId = decodedCookie.user_id;
  config.deviceId = decodedCookie.device_id;

  console.log(config);

  //create a div, insert into body of main website
  const newElement = document.createElement("div");
  newElement.setAttribute("id", `app_${token}`);
  document.body.appendChild(newElement);

  //use above created div to render react component
  const appElement = document.getElementById(`app_${token}`);
  ReactDOM.render(<App config={customConfig} />, appElement);
};
