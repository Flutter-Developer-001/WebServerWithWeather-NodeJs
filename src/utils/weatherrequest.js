const request = require("request");

const weatherRequest = (address, callback) => {
  const url =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    encodeURIComponent(address) +
    "&units=metric&appid=add84ef565302195cf7026c427b628f3";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to Process", undefined);
    } else if (body.cod >= 400) {
      callback("Error occure during api response, " + body.message, undefined);
    } else {
      callback(undefined, {
        tempreture: body.main.temp,
        feel: body.main.feels_like,
      });
    }
  });
};

module.exports = weatherRequest;
