// The address of the planet data
const apiAddress = "https://anurella.github.io/json/planet.json";

// Get the parts of the page that JavaScript needs to change
const searchForm = document.querySelector(".search-container");
const searchInput = document.getElementById("planet-search");
const searchStatus = document.getElementById("search-status");
const darkModeButton = document.getElementById("dark-mode");
const themeIcon = document.getElementById("theme-icon");
const headerLogo = document.getElementById("header-logo"); 
const searchError = document.getElementById("search-error");
const noResultsMessage = document.getElementById("no-results");
const planetSection = document.querySelector(".planet-hero");

let planets = [];

// Change between light mode and dark mode when the button is clicked
darkModeButton.addEventListener("click", function () {
  const isDark = document.body.classList.toggle("dark-theme");

  if (isDark) {
    themeIcon.src = "image/Theme Toggle2.svg";
    darkModeButton.setAttribute("aria-label", "Switch to light mode");
    headerLogo.src = "image/logo.svg";
  } else {
    themeIcon.src = "image/Theme Toggle.svg";
    darkModeButton.setAttribute("aria-label", "Switch to dark mode");
    headerLogo.src = "image/logo_black.svg";
  }
});

// Show one planet's information on the page
function showPlanet(planet) {
  noResultsMessage.hidden = true;
  planetSection.hidden = false;
  searchError.hidden = true;

  document.getElementById("planet-name").textContent = planet.name;
  document.getElementById("planet-type").textContent = planet.type;
  document.getElementById("planet-description").textContent = planet.description;
  document.getElementById("planet-gravity").textContent = planet.gravity;
  document.getElementById("planet-mass").textContent = planet.mass;
  document.getElementById("planet-period").textContent = planet.period;
  document.getElementById("temperature").textContent = planet.temperature;
  document.getElementById("moon").textContent = planet.moons;
  document.getElementById("diameter").textContent = planet.diameter;
  document.getElementById("distance").textContent = planet.distanceFromSun;

  const planetImage = document.getElementById("planet-image");
  planetImage.src = planet.image;
  planetImage.alt = "Image of " + planet.name;
}

// Get the planet information from the API when the page opens
fetch(apiAddress)
  .then(response => {
    return response.json();
  })
  .then(data => {
    planets = data;

    // Show Earth first when the page opens
    const earth = planets.find(planet => {
      return planet.name.toLowerCase() === "earth";
    });

    if (earth) {
      showPlanet(earth);
    }
    searchStatus.textContent = "Planet information loaded.";
  })
  .catch(function () {
    searchStatus.textContent = "Planet information could not be loaded.";
  });

  // Find and show the planet entered in the search box
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const searchName = searchInput.value.trim().toLowerCase();
  const planet = planets.find(function (item) {
    return item.name.toLowerCase() === searchName;
  });

  if (planet) {
    showPlanet(planet);
    searchInput.value = "";
    searchStatus.textContent = "Showing information for " + planet.name + ".";
  } else {
    noResultsMessage.hidden = false;
    planetSection.hidden = true;
    searchError.hidden = false;
  }
});


   


