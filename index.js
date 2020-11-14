
// [START maps_map_simple]
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 39.5, lng: -98.35 },
    zoom: 8,
  });
}