require("file-loader?name=[name].[ext]!./index.html");
import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { App } from "./App.js";
import { config } from "./config";
import { readCookie, createCookie } from "./utils.js";

// globle window funtion can be accessed from anywhere in the browser
window.fusionChat = function (customConfig) {
  //console.log("fusion chat intialized");

  // org token
  let token = customConfig.token;

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

  let fusionSavedCookie = readCookie(`fusion_${token}`);
  let decodedCookie = JSON.parse(decodeURIComponent(fusionSavedCookie));
  //console.log(decodedCookie);

  config.userId = decodedCookie.user_id;
  config.deviceId = decodedCookie.device_id;

  //cookie for storing widget setting eg: email sent or not
  let fusionWidgetCookie = readCookie(`fusion_widget_${config.token}`);
  //console.log(fusionWidgetCookie);
  if (fusionWidgetCookie === null) {
    createCookie(`fusion_widget_${config.token}`, "false", 730);
  }

  //console.log(config);

  //create a div, insert into body of main website
  const newElement = document.createElement("div");
  newElement.setAttribute("id", `app_${token}`);
  document.body.appendChild(newElement);

  //use above created div to render react component
  const appElement = document.getElementById(`app_${token}`);
  ReactDOM.render(<App config={customConfig} />, appElement);
};
