const request = require(`postman-request`);

const currentWeather = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=935ca24dc75a8b62f3b3deb577f1c404&query=${lat},${long}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(
        `Unable to Connect to Weather API. Check Your Internet Connection`,
        undefined
      );
    } else if (body.error) {
      callback(`Unable to Find Your Location in the Weather API`, undefined);
    } else {
      callback(undefined, {
        temp: body.current.temperature,
        feelTemp: body.current.feelslike,
        description: body.current.weather_descriptions[0],
        humidity: body.current.humidity,
        windSpeed: body.current.wind_speed,
        windDirection: body.current.wind_dir
      });
    }
  });
};

module.exports = currentWeather;
