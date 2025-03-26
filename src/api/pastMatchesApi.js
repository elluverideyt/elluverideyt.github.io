export const saveMatch = (matchData, dispatch) => {
  // Get past matches from local storage
  const matches = JSON.parse(localStorage.getItem("pastMatches")) || [];

  // Check if the match is already saved
  const isMatchSaved = matches.some((match) => match.id === matchData.id);
  if (isMatchSaved) {
    // If match is already saved, don't save it again
    return;
  }

  // if were saving the match, we should remove unneeded things from the state like history
  const { history, ...filteredMatchData } = matchData;

  // Save match to local storage
  matches.push(filteredMatchData);

  try {
    localStorage.setItem("pastMatches", JSON.stringify(matches));
  } catch (e) {
    if (e.name === "QuotaExceededError") {
      // Handle quota exceeded error
      console.error(
        "Local storage quota exceeded. Consider removing old matches."
      );
      // Optionally, remove the oldest match and try again
      matches.shift();
      localStorage.setItem("pastMatches", JSON.stringify(matches));
    } else {
      throw e;
    }
  }
};

export const getPastMatches = () => {
  // Get past matches from local storage
  return JSON.parse(localStorage.getItem("pastMatches")) || [];
};
