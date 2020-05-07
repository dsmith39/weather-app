//select various html elements from index.hbs
const weatherForm = document.querySelector(`form`);
const search = document.querySelector(`input`);
const errorMessage = document.getElementById(`error`);
const weatherTitle = document.getElementById(`weatherHeader`);
const weatherMessage = document.getElementById(`weatherInfo`);

// errorMessage.textContent = `From Javascript`;

//add an event listener that runs the weather api upon submitting the location in  the form
weatherForm.addEventListener(`submit`, (e) => {
  //prevent the form from reloading the page when the user presses submit
  e.preventDefault();
  //saves the value that the user inputs into the search form
  const location = search.value;
  //starts a loading message once the form is submitted
  errorMessage.textContent = `Loading Weather Information`;
  weatherHeader.textContent = ``;
  weatherMessage.textContent = ``;
  
  //fetches the API route that I created in src/app.js and adds in the location from the user's search
  fetch(`/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          errorMessage.textContent = `Error: ${data.error}`;
        } else {
            errorMessage.textContent = ``;
          weatherHeader.textContent = `${data.location}:`;
          weatherMessage.textContent = `${data.forecast}`;
        }
      });
    }
  );
});
