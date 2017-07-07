// This file is for testing on socket connection.
(function() {
  const socket = io.connect('/', { secure: true, transports: ['websocket'] });
}())
