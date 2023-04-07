// Select elements and fields
const formInput = document.querySelector('.formInput');
const searchBtn = document.querySelector('.searchBtn');
const resultsContainer = document.querySelector('.resultsContainer');
const ipAddressField = document.querySelector('.ipAddressField');
const locationField = document.querySelector('.locationField');
const timeZoneField = document.querySelector('.timeZoneField');
const zipCodeField = document.querySelector('.zipCodeField');
const spinner = document.querySelector('.spinner');
const errorPopup = document.querySelector('.errorPopup');

// Initializing Leaflet JS
const map = L.map('map');

// Adding OpenStreetMap tile layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Get the client IP Address
fetch('https://api.ipify.org?format=json')
  .then((res) => res.json())
  .then(({ ip }) => {
    formInput.value = ip;
    getIpAddressData(ip);
  })
  .catch((err) => {
    console.log(err);

    // Empty the input field
    formInput.value = '';

    // Hide the spinned
    spinner.classList.add('hidden');

    // Update the map's view to default
    map.setView([33.233334, -8.5], 10);
  });

// Get IP Address Data
function getIpAddressData(ip) {
  // Default options are marked with *
  fetch(`https://ip-address-tracker.up.railway.app/?ip=${ip}`)
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);

      // Display IP Address data
      ipAddressField.textContent = ip;
      locationField.textContent = data.result.city + ', ' + data.result.country;
      timeZoneField.textContent = data.result.time_zone;
      zipCodeField.textContent = data.result.zip_code;

      // Hide/Show components
      resultsContainer.classList.remove('hidden');
      spinner.classList.add('hidden');

      // Assign latitude and longitude
      let latitude = data.result.latitude;
      let longitude = data.result.longitude;

      // Update the map's view
      map.setView([latitude, longitude], 10);

      // Add the map's marker
      L.marker([latitude, longitude]).addTo(map);

      // Add the map's circle
      L.circle([latitude, longitude], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 10000,
      }).addTo(map);
    })
    .catch((error) => {
      console.error('Error:', error);

      // Show error popup
      errorPopup.classList.remove('hidden');
    });
}

// Fetch data when clicking search
searchBtn.addEventListener('click', async (event) => {
  event.preventDefault();

  // Check if form input is not empty
  if (formInput.value) {
    getIpAddressData(formInput.value);

    // Hide/Show components
    resultsContainer.classList.add('hidden');
    spinner.classList.remove('hidden');
    errorPopup.classList.add('hidden');
  }
});
