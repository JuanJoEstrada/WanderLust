// Foursquare API Info
const clientId = 'PMPQJJJKJCJJDRKC2HY5J3WPIEKY0AF2C4VANUUAVKZA3ODQ';
const clientSecret = 'HVG5NHVFJI21BAI5NVEYB0MF2CMPN0ZIM4L1JWWF432KJNYL';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = '6d70e4ccb9ee473071c206425d6abb06';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements using jquery
//Get the <button> element with the class 'continue' and change its HTML to 'Next Step...'
//$( "button.continue" ).html( "Next Step..." )
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues =async () => {
  const city= $input.val();
  const urlToFetch= `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20201020`;
  try{
    const response= await fetch(urlToFetch);
    if(response.ok){
      // console.log(response)
      const jsonResponse= await response.json();
      // console.log(jsonResponse);
      const venues = jsonResponse.response.groups[0].items.map(e=>e.venue); //seek for data in Developer Tool's console
      console.log(venues);
      return venues;
    }
  }catch(error){
    console.log(`Something happened ${error}`);
  }
}

const getForecast = async () => {
  const city= $input.val();
  const urlToFetch= `${weatherUrl}?q=${city}&appid=${openWeatherKey}`;
  // console.log(urlToFetch);
  try{
    const response= await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse= await response.json();
      console.log(jsonResponse);
      return jsonResponse;
    }
  }catch(error){
    console.log(error);
  }
}


// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
    const venue= venues[index];
    const venueIcon= venue.categories[0].icon;
    const venueImgSrc= `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
  // Add your code here:
	let weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues=>renderVenues(venues));
  getForecast().then(forecast=>renderForecast(forecast));
  return false;
}

$submit.click(executeSearch) //onclick