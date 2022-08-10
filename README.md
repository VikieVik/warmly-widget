# Warmly-live-session-widget

Live session widget for Warmly

# Production usage for client example usage

    below snippet needs to included inside head tag

```
    <script src="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb-all.min.js"></script>
    <script src="widget.js"></script>
    <script>
      window.fusionChat({
        // baseUrl: "wss://fusion-chat-backend.herokuapp.com",
        baseUrl: "SOCKET_IO_SERVER_URL",
        token: "RANDOM_API_TOKEN",
        primaryColor: "#0B1C48",
        iconStyle: "square",
        title: "Hi there 😇",
        subtitle: "Feel free to ask us anything ✨ 😻",
        agentAvailableText: "We are available!",
        agentUnavailableText: "We are not available at the moment.",
        requireEmailUpfront: true,
        showAgentAvailability: true,
      });
    </script>
```
