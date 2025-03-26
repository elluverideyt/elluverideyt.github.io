import { json2csv } from "json-2-csv";
import { csvApi } from "../../package.json";
// convert to csv here

// This is intended to be a failsafe and added layer of abstraction between our state and what ends up going into the csv
// If I'm stupid and accidentally mess up the state last minute (maybe change the position of a key or something), this will make it so that 'hopefully' it shouldn't effect our csv output
export const filterState = (inputState) => {
  const state = {
    ...inputState,
    ...inputState.auto,
    ...inputState.teleop,
    ...inputState.endgame,
  };

  const isQualitative = state.scoutingType === "qualitative";

  // a little bit of buffer changing stuff
  // capitalizing Shallow and Deep and just putting nothing if not selected
  state.endgame.climbingCage =
    state.endgame.climbingCage === "shallow" ||
    state.endgame.climbingCage === "Shallow"
      ? "Shallow"
      : state.endgame.climbingCage === "deep" ||
        state.endgame.climbingCage === "Deep"
      ? "Deep"
      : "";

  state.endgame.climbSuccessful =
    state.endgame.climbSuccessful === undefined
      ? "FALSE"
      : state.endgame.climbSuccessful;

  state.endgame.climbStartTime =
    state.endgame.climbStartTime === undefined
      ? ""
      : state.endgame.climbStartTime;

  // things we want in both modes
  const both = {
    csvVersion: csvApi,
    scouterName: state.scouterName,
    scouterID: state.scouterID,
    role: state.role,
    alliance: state.alliance,
    team: state.team,
    matchNumber: state.matchNumber,
    matchLevel: state.matchLevel,
  };

  const qualitative = {
    ...flattenQualState(state.qualitativeTeams),
  };

  const match = {
    auto: state.auto,
    teleop: state.teleop,
    endgame: state.endgame,
    defense: state.defense,
    robotProblems: state.robotProblems,
    hasScoutingErrors: state.hasScoutingErrors,
    scoutingErrors: state.scoutingErrors,
    comments: state.comments,
  };

  return {
    ...both,
    ...(isQualitative ? qualitative : match),
  };
};

const flattenQualState = (state) => {
  return Object.entries(state).reduce((obj, [key, val]) => {
    if (Array.isArray(val)) {
      return val.reduce((obj, val, i) => {
        obj = {
          ...obj,
          ...flattenQualState({ [`${key}-${i}`]: val }),
        };
        return obj;
      }, obj);
    } else if (typeof val === "object" && val !== null) {
      Object.entries(val).forEach(([key2, val2]) => {
        if (val2 === true) {
          obj[`${key}-${key2}`] = "TRUE";
        } else if (val2 === false) {
          obj[`${key}-${key2}`] = "FALSE";
        } else {
          obj[`${key}-${key2}`] = val2;
        }
      });
    } else if (val === true) {
      obj[key] = "TRUE";
    } else if (val === false) {
      obj[key] = "FALSE";
    } else {
      obj[key] = val;
    }
    return obj;
  }, {});
};

// flatten all objects in the state - we don't really need arrays i think
export const flattenState = (state) => {
  return Object.entries(state).reduce((obj, [key, val]) => {
    if (Array.isArray(val)) {
      const stringified = val.map((val) => JSON.stringify(val));
      obj[key] = stringified;
    } else if (typeof val === "object" && val !== null) {
      Object.entries(val).forEach(([key2, val2]) => {
        if (val2 === true) {
          obj[`${key}-${key2}`] = "TRUE";
        } else if (val2 === false) {
          obj[`${key}-${key2}`] = "FALSE";
        } else {
          obj[`${key}-${key2}`] = val2;
        }
      });
    } else if (val === true) {
      obj[key] = "TRUE";
    } else if (val === false) {
      obj[key] = "FALSE";
    } else {
      obj[key] = val;
    }
    return obj;
  }, {});
};

export const stateToCsv = (state) => {
  const filtered = filterState(state);
  const flattened = flattenState(filtered);

  console.log("Keys for Rain (HI RAIN!!!)", Object.keys(flattened));
  console.log("the entire state", flattened);

  const csv = json2csv(flattened, { prependHeader: false });
  console.log("csv", csv);
  return csv;
};

export const castType = (string) => {
  if (isFinite(string) && !isNaN(parseFloat(string)))
    return Number.parseFloat(string);
  if (string === "true") return true;
  if (string === "false") return false;

  return string;
};

/** shallow iteration over an object, to cast types into their respective values if applicable or leave them as strings */
export const castTypes = (object) => {
  return Object.entries(object).reduce((obj, [key, value]) => {
    obj[key] = castType(value);

    return obj;
  }, {});
};
