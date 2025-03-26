const apiKey =
  "fnwAT6yo0t4otgOrZ4EwZiZ2yPBAtxAcubngPwbcSYqtdaK9Jmmw4q3jttGNc7IY";
const baseUrl = "https://www.thebluealliance.com/api/v3";

const getMatchInfo = async (matchNumber, matchLevel, currentEventKey) => {
  if (matchLevel !== "qualification") {
    throw new Error("Match level not supported");
  }
  const matchKey = `${currentEventKey}_qm${matchNumber}`;
  const url = `${baseUrl}/match/${matchKey}/simple`;
  const rawMatchData = await fetch(url, {
    headers: {
      "X-TBA-Auth-Key": apiKey,
    },
  });

  if (rawMatchData.status === 404) {
    throw new Error("Match not found");
  }

  const matchData = await rawMatchData.json();
  return matchData;
};

const getAllianceFromMatch = (matchData, alliance) => {
  const allianceData = matchData.alliances[alliance];
  const teamKeys = allianceData.team_keys;
  return teamKeys.map((teamKey) => {
    return parseInt(teamKey.substring(3));
  });
};

const getTeamFromMatch = (matchData, alliance, teamIndex) => {
  const allianceData = matchData.alliances[alliance];
  const teamKey = allianceData.team_keys[teamIndex];
  return parseInt(teamKey.substring(3));
};

export const getTeamNumberFromMatchInfo = async (
  matchNumber,
  matchLevel,
  alliance,
  teamIndex,
  currentEventKey
) => {
  const matchData = await getMatchInfo(
    matchNumber,
    matchLevel,
    currentEventKey
  );
  return getTeamFromMatch(matchData, alliance, teamIndex);
};

export const getAllianceNumbersFromMatchInfo = async (
  matchNumber,
  matchLevel,
  alliance,
  currentEventKey
) => {
  const matchData = await getMatchInfo(
    matchNumber,
    matchLevel,
    currentEventKey
  );
  return getAllianceFromMatch(matchData, alliance);
};
