import { option, pre, section } from "framer-motion/client";
import { version } from "../../package.json";
const versionArray = version.split(".");

export const initialSettings = {
  version: {
    major: parseInt(versionArray[0]),
    minor: parseInt(versionArray[1]),
    patch: parseInt(versionArray[2]),
  },
  darkMode: true,
  autoIncreaseMatch: true,
  autoAutofillTeamNumber: true,
  scoutingPageTransitions: true,
  stimulation: false,
  eventID: "2025azgl",
  googleSheetLink:
    "https://docs.google.com/spreadsheets/d/1kSr_ngBBaN168NIqt-iZQvQrdVbuV8SCxtqtAYdoPJg/edit",
  googleSheetTab: "CSV Dump",
  googleSheetTabQual: "Qual",
  googleSheetColNumber: 2,
  rickRoll: false,
  subwaySurf: false,
  displayBackgroundGame: false,
  backgroundGame: "BlockBlast",
  benMode: false,
};

export const settingsInfo = [
  {
    section: "General Settings",
    settings: [
      {
        name: "Dark Mode",
        key: "darkMode",
        type: "boolean",
        description: "Enable dark mode",
      },
      {
        name: "Auto Increase Match",
        key: "autoIncreaseMatch",
        type: "boolean",
        description: "Automatically increase match number",
      },
      {
        name: "Auto Autofill Team Number",
        key: "autoAutofillTeamNumber",
        type: "boolean",
        description: "Automatically autofill team number when possible",
      },
      {
        name: "Scouting Page Transitions",
        key: "scoutingPageTransitions",
        type: "boolean",
        description: "Enable page transitions",
      },
      {
        name: "Stimulation",
        key: "stimulation",
        type: "boolean",
        description:
          "Enable input and page stimulation (cool animations for the extra dopamine)",
      },
    ],
  },
  {
    section: "Event Specific Settings",
    settings: [
      {
        name: "Event ID",
        key: "eventID",
        type: "string",
        description:
          "Enter the event ID. format: YYYY[EventCode] (e.g. 2024cacc)",
      },
      {
        name: "Google Sheet Link",
        key: "googleSheetLink",
        type: "string",
        description:
          "Insert the link to the current scouting google sheet - make sure it is the correct link",
      },
      {
        name: "Google Sheet Tab",
        key: "googleSheetTab",
        type: "string",
        description:
          "Insert the name of the tab you want to insert data into for match scouting, should be CSV Dump by default for competition",
      },
      {
        name: "Google Sheet Tab Qual",
        key: "googleSheetTabQual",
        type: "string",
        description:
          "Insert the name of the tab you want to insert data into for qual scouting, should be Qual by default for competition",
      },
      {
        name: "Google Sheet Column Number",
        key: "googleSheetColNumber",
        type: "string",
        description:
          "Insert the column number you want to read data from, should be 3 by default for competition",
      },
    ],
  },
  {
    section: "Memes",
    settings: [
      {
        name: "Rick Roll",
        key: "rickRoll",
        type: "boolean",
        description: "Enable rick roll - please don't do this in a competition",
      },
      {
        name: "Subway Surf",
        key: "subwaySurf",
        type: "boolean",
        description:
          "Increase your concentration- please don't do this in a competition",
      },
      {
        name: "Display Background Game",
        key: "displayBackgroundGame",
        type: "boolean",
        description: "Display a game in the background",
      },
      {
        name: "Background Game",
        key: "backgroundGame",
        type: "dropdown",
        options: [
          {
            value: "BlockBlast",
            label: "Block Blast",
          },
          {
            value: "Dino",
            label: "Dino",
          },
          {
            value: "Minecraft",
            label: "Minecraft",
          },
        ],
        description: "Play a game in the background",
      },
      {
        name: "Ben mode",
        key: "benMode",
        type: "boolean",
        description: "Enable the most majestic scouting app mode",
      },
    ],
  },
];

export const getSettings = () => {
  let settings = {
    ...initialSettings,
    ...JSON.parse(localStorage.getItem("settings") ?? "{}"),
  };
  const prevVersion = settings.version;

  // update the version number
  settings = {
    ...settings,
    version: { ...initialSettings.version },
  };

  // updating settings if version has changed
  if (
    settings.version.patch !== prevVersion.patch ||
    settings.version.minor !== prevVersion.minor ||
    settings.version.major !== prevVersion.major
  ) {
    settings = {
      ...settings,
      googleSheetLink: initialSettings.googleSheetLink,
      googleSheetTab: initialSettings.googleSheetTab,
      googleSheetTabQual: initialSettings.googleSheetTabQual,
      googleSheetColNumber: initialSettings.googleSheetColNumber,
      eventID: initialSettings.eventID,
    };
  }
  localStorage.setItem("settings", JSON.stringify(settings));
  return settings;
};

export const initialStoredSettings = getSettings();

const settingsReducerInternal = (settings, action) => {
  //add functionalities here
  switch (action.type) {
    case "SET":
      return { ...settings, ...action.payload };
    case "TOGGLE":
      return { ...settings, [action.payload]: !settings[action.payload] };
    default:
      return settings;
  }
};

export const settingsReducer = (state, action) => {
  const newState = settingsReducerInternal(state, action);
  localStorage.setItem("settings", JSON.stringify(newState));
  return newState;
};
