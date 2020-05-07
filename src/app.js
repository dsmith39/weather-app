const path = require(`path`);
const express = require(`express`);
const hbs = require(`hbs`);
const geocode = require(`./utils/geocode`);
const currentWeather = require(`./utils/weather`);

//creates a new instance of express called app
const app = express();
//setup a port for heroku deployment or port 3000 if it does not exist
const port = process.env.PORT || 3000

//create a path, based off of __dirname, which points to C:\Users\Lukah\Documents\WEBSITES\udemyNode\web-server\src , then works off of that path to move to the public folder
const publicDirectoryPath = path.join(__dirname, `../public`);
// points to views
const viewsPath = path.join(__dirname, `../templates/views`);
const paritalsPath = path.join(__dirname, `../templates/partials`);

//.use runs express.static in the given directory. I use express.static to serve up static files
app.use(express.static(publicDirectoryPath));

//app.set assigns setting names, the first arg, to the setting found in the second arg
app.set(`view engine`, `hbs`);
app.set(`views`, viewsPath);
//sets path for the partials directory
hbs.registerPartials(paritalsPath);

//setup of HTTP GET requests
//index page route
app.get(``, (req, res) => {
  res.render(`index`, {
    heading: `Weather App`,
    title: `Home Page`,
    name: `Dillon Smith`,
  });
});

//about page route
app.get(`/about`, (req, res) => {
  res.render(`about`, {
    heading: `About`,
    title: `About Page`,
    name: `Dillon Smith`,
  });
});

//help page route
app.get(`/help`, (req, res) => {
  res.render(`help`, {
    heading: `Help`,
    title: `Help page`,
    name: `Dillon Smith`,
    helpText: `This is an example help message`,
  });
});

app.get(`/weather`, (req, res) => {
  if (!req.query.address) {
    res.send({ error: `You must provide an address.` });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          res.send({error: `Enter a valid Address`});
        } else {
          currentWeather(latitude, longitude, (error, weatherData) => {
            if (error) {
              res.send(error);
            } else {
              res.send({
                forecast: weatherData,
                location: location,
                address: req.query.address,
              });
            }
          });
        }
      }
    );
  }
});

//error handling 404 pages
//error for missing help articles
app.get(`/help/*`, (req, res) => {
  res.render(`help404`, {
    heading: `Missing Help Article!`,
    title: `404 Page`,
    name: `Dillon Smith`,
    errorMessage: `This Help article cannot be found.`,
  });
});
//error for missing pages
app.get(`*`, (req, res) => {
  res.render(`404`, {
    heading: `Error 404`,
    title: `404 Page`,
    name: `Dillon Smith`,
    errorMessage: `This page cannot be found. Please check your URL.`,
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
