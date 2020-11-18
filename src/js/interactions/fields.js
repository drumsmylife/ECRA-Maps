import $ from "jquery";

//import store and retrieve functions for storing data in local storage
import { store, retrieve } from "../utils/storage";

//this will populate our geocoding fields which are the five drop-downs that correspond to the address components
export const populateGeocodingFields = () => {
  const fields = retrieve("fields");

  //saves the field configuration and will separate the geocoding fields from the data fields
  store("config", {
    fields: {
      geocoding: {
        address: fields[0],
        city: fields[0],
        province: fields[0],
        postalCode: fields[0],
        country: fields[0],
      },
      data: []
    },
  });

  // this will create the option elements that will populate our select inputs
  fields.forEach((field) => {
    let $option = $("<option />").attr("value", field).text(field);

    $(
        "#addressInput, #cityInput, #provinceInput, #postalCodeInput, #countryInput"
      ).append($option);
    });
  };

  //this function will update our config object when we make a selection on our dropdown
  export const setGeocodingField = (name, fieldName) => {
    let config = retrieve("config");
    config.fields.geocoding[name] = fieldName;
    store("config", config);
  };

  //these will be check boxes which will be optional bits of info that we want to attach to the locations that aren't related to the components of the address
  export const populateDataFields = () => {
    const fields = retrieve("fields");
    const config = retrieve("config");
  
    // creating a copy of the array of field names using the spread operator and store in a new array called dataFields
    let dataFields = [...fields];
    // retrieving the geocoding fields by using the values method of Object. Which will take all the values from our object and put them into an array
    let geocodingFields = Object.values(config.fields.geocoding);
    geocodingFields.forEach((v) => {
      let index = dataFields.findIndex((f) => f === v);
      if (index !== -1) dataFields.splice(index, 1);
    });


  config.fields.data = dataFields;
  store("config", config);

  //this clears all the html whenever we change one of the geocoding dropdowns
  $("#dataFieldsContainer").html("");

  dataFields.forEach((field) => {
      //creates a container around the checkbox called switch.
    let $switch = $("<div />").attr("class", "custom-control custom-switch");

    //actual checkbox that works behind the scenes/a.k.a. backend
    let $input = $("<input />")
    .attr("class", "custom-control-input")
    .attr("type", "checkbox")
    .attr("name", field)
    .attr("id", field)
    // by default we want all our switches to be on when populated by setting checked to true.
    .prop("checked", true)
    .change(function () {
        if ($(this).prop("checked")) addDataField($(this).attr("name"));
        else removeDataField($(this).attr("name"));
    });

    let $label = $("<label />")
    .attr("class", "custom-control-label")
    .attr("for", field)
    .text(field);

    $switch.append($input);
    $switch.append($label);
    $("#dataFieldsContainer").append($switch);
  });
};

// So if user flips the switch to turn it off we want to actually remove the field from ther array of data fields in our config object.
const removeDataField = (fieldName) => {
    let config = retrieve("config");
  
    // loop through to find the index of the field that matches the name of the one that user flipped.
    let index = config.fields.data.findIndex((f) => f === fieldName);
    if (index !== -1) config.fields.data.splice(index, 1);
  
    store("config", config);
  };

  const addDataField = (fieldName) => {
    let config = retrieve("config");
    config.fields.data.push(fieldName);
    store("config", config);
  };

  export const setFieldsDisabled = (disabled) => {
    $(".form-control, .custom-control-input").prop("disabled", disabled);
    $("#importReturnButton").prop("disabled", disabled);
    $("#plotButton").prop("disabled", disabled);
  };

