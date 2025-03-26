import { googleAPIConstants } from "../constants";

// This is a function that connects to a google app script
// It runs a function in the script that adds a the data to a google sheet
// The google sheet is defined by the user
// If multiple requests are made at the same time, they will be added to the sheet in order but they will not override eachother (i.e. once they reach the google server they will be processed sequentially)
export const submitToGoogleSheet = async (
  data,
  sheetURL,
  sheetName,
  colNumber
) => {
  const { scriptURL } = googleAPIConstants;

  try {
    const response = await fetch(
      scriptURL +
        `?csvData=${data}&sheetURL=${sheetURL}&sheetName=${sheetName}&colNumber=${colNumber}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    } else {
      const result = await response.json();
      if (result.success === false) {
        throw new Error(result.message);
      }
      return result;
    }
  } catch (error) {
    throw error;
  }
};
