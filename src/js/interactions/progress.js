import $ from "jquery";

import { store, retrieve } from "../utils/storage";

//take in a certain incrrement as an argument. Progress bar will be visisble.
export const incrementProgressBar = (increment) => {
    $("#progressBarContainer").show();

    //retrieve the figure for our progress. 
    let progress = retrieve("progress");
    progress += increment;
  
    //styling the progress bar.
    $("#progressBar").css("width", `${progress.toFixed(1)}%`);
    $("#progressBar").text(`${progress.toFixed(1)}%`);
  
    //store the updated progress and pass in new progress
    store("progress", progress);
};

//clearing and resetting progress bar when done. If user needs to restart the settings will  be set back to the beginning steps now.
export const resetProgressBar = () => {
    store("progress", 0);
    $("#progressBar").css("width", "0%");
    $("#progressBar").text("0%");
    $("#progressBarContainer").hide();
  };