const request = require(`postman-request`);

const currentWeather = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=935ca24dc75a8b62f3b3deb577f1c404&query=${lat},${long}&units=f`;

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback(
        `Unable to Connect to Weather API. Check Your Internet Connection`,
        undefined
      );
    } else if (body.error) {
      callback(`Unable to Find Your Location in the Weather API`, undefined);
    } else {
      callback(
        undefined,
        `The Current Temperature is ${body.current.temperature}, but it feels like ${body.current.feelslike}. It is ${body.current.weather_descriptions} outside.`
      );
    }
  });
};

module.exports = currentWeather;
