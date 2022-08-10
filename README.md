# Warmly-live-session-widget

Live session widget for Warmly


# Demo & Setup

https://www.loom.com/share/8cf5d7ec51b147149aeccef83192c5b1

# Development usage

1. `npm install` for installing dependancies
2. `npm run serve` will start development server at localhost:3010
   with a demo website where widget is inserted
3. Clone https://github.com/singh-vikas-m/live-record-replay-website repo and run server & replayer code from setup video of that project.
   As soon as you go to localhost:3010 you will see live replay on the replayer site given server is running(at localhost:3000) & api url & token is same for all 3 codes.
4. `npm run build` will bundle all code to single js & html file. Now you can deploy the widget.js fle from dict folder to CDN and use it on client site using below snippet

# Production usage for client example usage()

    below snippet needs to included inside head tag, replace widget.js to cdn url of your widget.js & change baseUrl & token with your socket server url & token

```
  <script src="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb-all.min.js"></script>
    <script src="widget.js"></script>
    <script>
      window.fusionChat({
        // baseUrl: "wss://fusion-chat-backend.herokuapp.com",
        baseUrl: "http://localhost:3000",
        token: "SqFR5uoLEUX8Qzuo66xF686qxf23",
        primaryColor: "#0B1C48",
        title: "Hi there 😇",
        subtitle: "Feel free to ask us anything ✨ 😻",
      });
    </script>
```
