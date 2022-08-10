/** logic for sending live session replay events using socket.io */

import io from "socket.io-client";

export function startLiveSession(customConfig) {
  var { token, baseUrl } = customConfig;

  // example:
  // apiServer = http://localhost:3000"
  // roomName = SqFR5uoLEUX8Qzuo66xF686qxf23

  var socket = io(baseUrl);
  var roomName = token;

  console.log("connecting with session server.....", baseUrl);

  socket.on("connect", () => {
    // instruct a room name to be joined by server
    socket.emit("new-user", roomName);

    console.log("live session started....");
    rrweb.record({
      emit(event) {
        //console.log(event);
        // sent to room for agent
        socket.emit("send-event", { event: event, room: roomName });
      },
    });

    // recevied from agent side
    socket.on("agent-event", (data) => {
      console.log(data);
    });
  });
}
