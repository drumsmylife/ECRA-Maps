//this function is going to return a hyphenated date as a string
export const dateAsYYYYMMDD = () => {
    const date = new Date();
    return date.toISOString().split("T")[0];
  };