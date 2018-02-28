/* CONFIGURANDO EL SERVIDOR */
const http = require("http");
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO.listen(server);

app.use(express.static(__dirname + "/public"));
server.listen(3000, () => {
  console.log("Servidor ejecutandose!");
});

/* CONEXION CON EL ARDUINO */
var jf = require("johnny-five");
var arduino = new jf.Board();
var tmp, led;

arduino.on("ready", function () {
  var sensor = new jf.Sensor({
    pin: "A0",
    freq: 1000,
    threshold: 5
  });
  led = new jf.Led(9);
  // led.on();
  // led.off();

  sensor.on("change", function () {
    tmp = this.scaleTo(1023, 0);
    if (tmp < 40) {
      led.on();
    } else {
      led.off();
    }
    io.emit('tmp', tmp);
    console.log(tmp);
  });
});