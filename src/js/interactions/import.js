import { parseCsv, parseJson } from "../utils/file";

/*
 * callback(err, filename, contents)
 */
export const handleCsvFileChange = (files, callback) => {
    //if we dont have at least 1 file present, then return this callback
    if (files.length < 1) 
      return callback("Choose CSV file...", null, null);
  
      //a file is present 
    const file = files[0];
  
    //this callback will happen if user does not choose a csv file
    if (file.type !== "text/csv" && !file.name.includes(".csv"))
      return callback("Invalid file type, must be a CSV file.", null, null);
  
      // csv file is chosen if we make it this far.
    let fileReader = new FileReader();
    fileReader.onload = (e) =>
      callback(null, file.name, parseCsv(e.target.result));
      //if something goes wrong there will be an error message receieved 
    fileReader.onerror = (err) => callback(err, null, null);
    fileReader.readAsText(file);
  };

  export const resetImportFields = () => {
      // its going to take a look at csv file label and reset text back to default text
    $("#csvFileLabel").text("Choose CSV file...");
    //make sure that it is not disabled
    $("#csvFileInput").prop("disabled", false);
    // reset the value of the file in case any file was left behind
    $("#csvFileInput").val("");
    //same steps for json
    $("#jsonFileLabel").text("Choose JSON file...");
    $("#jsonFileInput").prop("disabled", false);
    $("#jsonFileInput").val("");
  };
  
  
  