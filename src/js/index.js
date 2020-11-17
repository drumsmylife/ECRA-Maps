//importing jquery
import $ from "jquery";

import "bootstrap/dist/css/bootstrap.min.css";
//importing our custom style sheet
import "../style.css";

import {
  goToImportSection,
  goToFieldsSection,
  goToRouteSection,
  skipToRouteSection,
  returnToImportSection,
  returnToFieldsSection,
} from "./interactions/navigation";

import {
    handleCsvFileChange,
  } from "./interactions/import";
  
  import { store } from "./utils/storage";

$(() => {
  /*
   * Home Section
   */
  $("#getStartedButton").click(() => {
    goToImportSection();
    $("#importButton").prop("disabled", true);
  });

  /*
   * Import Section
   */
  $("#csvFileInput").change((e) => {
    handleCsvFileChange(e.target.files, (err, filename, contents) => {
      if (err) return $("#csvFileLabel").text(err);

      store("data", contents.data);
      store("fields", contents.fields);

      console.log("data", contents.data);
      console.log("fields", contents.fields);
  
      $("#csvFileLabel").text(`File: ${filename}`);
      $("#jsonFileLabel").text("Choose JSON file...");
      $("#jsonFileInput").val("");
      $("#importButton").prop("disabled", false);

      $("#fileSummarySpan").html(
        `<b>${contents.data.length}</b> rows from <b>${filename}</b>`);
      });
    });

  $("#jsonFileInput").change((e) => {


  });

  $("#importButton").click(() => {
    $("#csvFileInput").prop("disabled", true);
    $("#jsonFileInput").prop("disabled", true);

    const isCsv = $("#csvFileInput").val() ? true : false;
    const isJson = $("#jsonFileInput").val() ? true : false;

    if (isCsv) {

    } else if (isJson) {
     
    }
  })
});
