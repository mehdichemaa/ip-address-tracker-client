// Select elements and fields
const formInput = document.querySelector('.formInput');
const searchBtn = document.querySelector('.searchBtn');
const resultsContainer = document.querySelector('.resultsContainer');
const ipAddressField = document.querySelector('.ipAddressField');
const locationField = document.querySelector('.locationField');
const timeZoneField = document.querySelector('.timeZoneField');
const zipCodeField = document.querySelector('.zipCodeField');

// Get the client IP Address
fetch('https://api.ipify.org?format=json')
  .then((res) => res.json())
  .then(({ ip }) => {
    formInput.value = ip;
    getIpAddressData(ip);
  })
  .catch((err) => console.log(err));

// Get IP Address Data
function getIpAddressData(ip) {
  // Default options are marked with *
  fetch(`https://ip-address-tracker.up.railway.app/?ip=${ip}`)
    .then((response) => response.json())
    .then((data) => {
      // Display IP Address data
      ipAddressField.textContent = ip;
      locationField.textContent = data.result.city + ', ' + data.result.country;
      timeZoneField.textContent = data.result.time_zone;
      zipCodeField.textContent = data.result.zip_code;
      resultsContainer.classList.remove('hidden');

      // Assign latitude and longitude
      let latitude = data.result.latitude;
      let longitude = data.result.longitude;

      // Initializing Leaflet JS
      let map = L.map('map').setView([latitude, longitude], 13);

      // Adding OpenStreetMap tile layer
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Update the map's view
      map.setView([latitude, longitude], 13);

      // Add the map's marker
      L.marker([latitude, longitude]).addTo(map);

      // Add the map's circle
      L.circle([latitude, longitude], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 1000,
      }).addTo(map);

      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Fetch data when clicking search
searchBtn.addEventListener('click', async (event) => {
  event.preventDefault();

  // Check if form input is not empty
  if (formInput.value) {
    getIpAddressData(formInput.value);
  }
});
