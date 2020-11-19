
export const addressAsString = ({
    address,
    city,
    state,
    zip,
    schoolName,
  }) => {
    return `${address}, ${city}, ${state} ${zip}, ${schoolName}`;
  };
  
  export const jsonAsText = (json) => {
    let text = JSON.stringify(json, null, 1);
    text = text.replace("\n", "");
    text = text.replace("\r", "");
    return text;
  };
  