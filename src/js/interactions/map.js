import $ from "jquery";

import { jsonAsText } from "../utils/string";

import { retrieve, store } from "../utils/storage";

import { alphabet } from "../utils/array";

import { embedJsonData } from "../export/json";


export const createMap = () => {
  const data = retrieve("data");
  let mapOptions = {
    mapTypeControl: false,
    rotateControl: false,
    zoom: 11,
  };
    //array to hold our markers
    let markers = [];
    // this bounds object represents the coordinates that are aligned with the rectangle that our map occupies
    let bounds = new google.maps.LatLngBounds();

    let map = new google.maps.Map(document.getElementById("map"), mapOptions);

    let directionsRenderer = new google.maps.DirectionsRenderer({
      preserveViewport: true,
    });
    directionsRenderer.addListener("directions_changed", handleDirectionsChanged);
    directionsRenderer.setMap(map);
  
    
    //looping over our data. 
    data.forEach((d, i) => {
        let m = new google.maps.Marker({
          map: map,
          title: d.addressString,
          position: d.latLng,
        });

        //when we hover our mouse over a marker this will allow info to be displayed about that area
        m.addListener("mouseover", () => {
          $("#locationPre").text(JSON.stringify(d.addressObject, null, 2));
          $("#dataPre").text(JSON.stringify(d.data, null, 2));
        });

        //going to do the opposite of mouseover. Will not show data anymore when hovered over marker
        m.addListener("mouseout", () => {
          $("#locationPre").text("No location to show.");
          $("#dataPre").text("No data to show.");
        });

        m.addListener("click", () => {
          pushRouteLocation(i);
          renderDirections(directionsRenderer, map);

          const route = retrieve("route");
      if (route.length >= 2) {
        markers
          .filter((m, i) => route.includes(i))
          .forEach((m) => m.setMap(null));
      }
    });
    

        markers.push(m);
     //ensures that the rectangular bounds around the map will also contain this location/so nothing will fall outside of the map
        bounds.extend(d.latLng);
    });

    map.fitBounds(bounds);

    let resetControl = document.createElement("div");
    createResetControl(resetControl);
    resetControl.index = 1;
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(resetControl);

    return map;


};

export const renderDirections = (directionsRenderer, map) => {
  const route = retrieve("route");
  if (!route || route.length <= 1) return directionsRenderer.setMap(null);

  const data = retrieve("data");
  directionsRenderer.setMap(map);

  let waypoints = [];
  route.forEach((index, i) => {
    if (i !== 0 && i !== route.length - 1) {
      waypoints.push({
        location: data[index].latLng,
        stopover: true,
      });
    }
  });

  let directionsService = new google.maps.DirectionsService();
  directionsService.route(
    {
      origin: data[route[0]].latLng,
      destination: data[route[route.length - 1]].latLng,
      waypoints: waypoints,
      optimizeWaypoints: true,
      travelMode: "DRIVING",
    },
    (results, status) => {
      if (status === "OK") directionsRenderer.setDirections(results);
    }
  );
};


const pushRouteLocation = (index) => {
  let route = retrieve("route");
  if (!route) route = [];

  route.push(index);
  store("route", route);
};

//everytime we add to our array our json data will be updated as well through this function
export const handleDirectionsChanged = () => {
 const route = retrieve("route");
  const data = retrieve("data");

  embedJsonData();

  $("#locationTableBody").html("");
  route.forEach((index, i) => {
    let $tr = $("<tr />");

    let $td1 = $("<td />").attr("scope", "row").text(alphabet[i]);
    let $td2 = $("<td />").text(data[index].addressString);
    let $td3 = $("<td />").text(jsonAsText(data[index].data));


    //append each column to our row element.
    $tr.append($td1);
    $tr.append($td2);
    $tr.append($td3);
    $("#locationTableBody").append($tr);
  });

};

//will let the user reset their routes when they have chosen their path desired. 
const createResetControl = (div) => {
  let resetControl = document.createElement("div");
  resetControl.className = "map-button";
  resetControl.title = "Click to reset route.";
  div.appendChild(resetControl);

  let resetText = document.createElement("div");
  resetText.className = "map-button-text";
  resetText.innerHTML = "Reset Route";
  resetControl.appendChild(resetText);

  resetControl.addEventListener("click", () => {
    store("route", []);
    embedJsonData();
    createMap();
 
    let $td = $("<td />")
    .attr("colspan", "3")
    .text("No directions to show.");
  let $tr = $("<tr />").append($td);
  $("#locationTableBody").html("");
  $("#locationTableBody").append($tr);
});
};