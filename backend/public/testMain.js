(function() {
  const socket = io.connect('/', { secure: true, transports: ['websocket'] });
}())
