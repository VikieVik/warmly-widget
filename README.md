# fusion-chat-widget

Live chat widget for fusion

# example usage

    below snippet needs to included inside head tag

```
   <script src="widget.js"></script>
    <script>
      window.fusionChat({
        baseUrl: "wss://fusion-chat-backend.herokuapp.com",
        token: "608813b5254914007109279a",
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
