import $ from "jquery";
import { retrieve, store } from "../utils/storage";


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
    
    //looping over our data. 
    data.forEach((d, i) => {
        let m = new google.maps.Marker({
          map: map,
          title: d.addressString,
          position: d.latLng,
        });

        markers.push(m);
     //ensures that the rectangular bounds around the map will also contain this location/so nothing will fall outside of the map
        bounds.extend(d.latLng);
    });

    map.fitBounds(bounds);
    return map;


}