// Select elements and fields
const formInput = document.querySelector('.formInput');
const searchBtn = document.querySelector('.searchBtn');
const ipAddressField = document.querySelector('.ipAddressField');
const locationField = document.querySelector('.locationField');
const timeZoneField = document.querySelector('.timeZoneField');
const zipCodeField = document.querySelector('.zipCodeField');

// Get IP Address Data
async function getIpAddressData(ip) {
  // Default options are marked with *
  const response = await fetch(`http://127.0.0.1:3000/?ip=${ip}`)
    .then((response) => response.json())
    .then((data) => {
      ipAddressField.textContent = ip;
      locationField.textContent = data.result.city + ', ' + data.result.country;
      timeZoneField.textContent = data.result.time_zone;
      zipCodeField.textContent = data.result.zip_code;

      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Fetch data when clicking search
searchBtn.addEventListener('click', async (event) => {
  event.preventDefault();

  if (formInput.value) {
    getIpAddressData(formInput.value);
  }
});

// Initializing Leaflet JS
var map = L.map('map').setView([51.505, -0.09], 13);

// Adding OpenStreetMap tile layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

L.marker([51.5, -0.09])
  .addTo(map)
  .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
  .openPopup();
