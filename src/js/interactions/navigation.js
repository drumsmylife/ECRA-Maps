import $ from "jquery";

//This will hide home section and show the import section
export const goToImportSection = () => {
  $("#homeSection").hide();
  $("#importSection").show();
};
//This will hide import section and show the fields section
export const goToFieldsSection = () => {
  $("#importSection").hide();
  $("#fieldsSection").show();
};
//This will hide field section and show the import section
export const returnToImportSection = () => {
  $("#fieldsSection").hide();
  $("#importSection").show();
};
//This will hide import section and show the route section
export const skipToRouteSection = () => {
  $("#importSection").hide();
  $("#routeSection").show();
};
//This will hide field section and show the route section
export const goToRouteSection = () => {
  $("#fieldsSection").hide();
  $("#routeSection").show();
};
//This will hide route section and show the field section
export const returnToFieldsSection = () => {
  $("#routeSection").hide();
  $("#fieldsSection").show();
};