import $ from "jquery";

import { retrieve } from "../utils/storage";
import { dateAsYYYYMMDD } from "../utils/date";


export const embedJsonData = () => {
    const json = {
      data: retrieve("data"),
      route: retrieve("route"),
    };

    //basically escpae the string and keep it in a url friendly format
    const encodedJson = encodeURIComponent(JSON.stringify(json));

    $("#exportJsonButton").attr(
        "download", 
        `map-data-${dateAsYYYYMMDD()}.json`
      );

      //this is where we embed the data
      $("#exportJsonButton").attr(
        "href",
        `data:text/json;charset=utf-8,${encodedJson}`
      );
    };
    