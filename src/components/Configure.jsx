import React, { useEffect } from "react";
import {
  getAllianceNumbersFromMatchInfo,
  getTeamNumberFromMatchInfo,
} from "../api/tbaApi";
import { matchLevels, roles } from "../constants";
import { useAppState, useSettings } from "../state/state";
import Button from "./inputs/Button";
import NextButton from "./inputs/button_variants/NextButton";
import DropdownInput from "./inputs/DropdownInput";
import ShortTextInput from "./inputs/ShortTextInput";

const Configure = () => {
  const [state, dispatch] = useAppState();
  const [settings, settingsDispatch] = useSettings();

  // handle autofilling team number without button press
  // also reset the team numbers if it cant autofill
  useEffect(() => {
    if (navigator.onLine) {
      if (settings.autoAutofillTeamNumber && canAutofillTeamNumber()) {
        handleTeamNumberAutofill();
      } else if (settings.autoAutofillTeamNumber) {
        // if we can't autofill the number than we should reset the team numbers
        if (state.scoutingType === "qualitative") {
          dispatch({
            type: "SET",
            payload: {
              qualitativeTeams: [{ team: "" }, { team: "" }, { team: "" }],
            },
          });
        } else {
          dispatch({
            type: "SET",
            payload: {
              team: "",
            },
          });
        }
      }
    }
  }, [state.matchNumber, state.matchLevel, state.role]);

  // handle autofilling team number
  const handleTeamNumberAutofill = async () => {
    console.log("Autofilling team number");
    try {
      if (!navigator.onLine) {
        throw new Error("You must be online to autofill the team number.");
      }
      if (state.scoutingType === "qualitative") {
        const teamNumbers = await getAllianceNumbersFromMatchInfo(
          state.matchNumber,
          state.matchLevel,
          state.alliance,
          settings.eventID
        );
        for (let i = 0; i < teamNumbers.length; i++) {
          dispatch({
            type: "SET_IN_QUAL",
            index: i,
            payload: { team: teamNumbers[i] },
          });
        }
      } else {
        const teamIndex = state.role[state.role.length - 1] - 1;
        const teamNumber = await getTeamNumberFromMatchInfo(
          state.matchNumber,
          state.matchLevel,
          state.alliance,
          teamIndex,
          settings.eventID
        );
        dispatch({
          type: "SET",
          payload: { team: teamNumber },
        });
      }
    } catch (error) {
      console.error(error);
      alert(error + "\nPlease enter the team number manually.");
    }
  };

  const canGoNext = () => {
    if (!state.scouterName || !state.role || !state.matchNumber) {
      return false;
    }
    if (state.scoutingType === "qualitative") {
      return state.qualitativeTeams.every((team) => team.team);
    } else {
      return state.team;
    }
  };

  const canAutofillTeamNumber = () => {
    return (
      state.matchNumber &&
      state.matchLevel &&
      state.role &&
      state.matchNumber < 100 &&
      state.matchNumber > 0 &&
      state.matchLevel === "qualification"
    );
  };

  return (
    <div className="h-full w-full flex flex-col xs:flex-row text-lg">
      {/* Main Body */}
      <div className="grow flex flex-col p-1flex-1 overflow-scroll">
        {/* Scouter Info Section */}
        <div className="border-2 border-dark dark:border-light rounded-lg">
          <div className="text-sm ml-1 underline">Scouter Information</div>
          <div className="flex flex-col xs:flex-row justify-between p-2 gap-2">
            <ShortTextInput
              label="Scouter Name"
              placeholder={"Enter your name here"}
              stateProp={"scouterName"}
              className={"flex-1"}
            />
            {/* Removed scouter ID for now.... it wasn't implemented withing the google sheet */}
            {/* Currently defaults to "" (empty) */}
            {/* <ShortTextInput
              label="Scouter ID"
              placeholder={"Enter your ID here"}
              stateProp={"scouterID"}
              type="number"
            /> */}
            <DropdownInput
              label={"Scouter Role"}
              options={roles}
              stateProp={"role"}
              className={"flex-1"}
              onChange={(e) => {
                if (e.target.value.includes("Qualitative")) {
                  //check qualitative vs match
                  dispatch({
                    type: "SET",
                    payload: {
                      scoutingType: "qualitative",
                    },
                  });
                } else {
                  dispatch({
                    type: "SET",
                    payload: {
                      scoutingType: "match",
                    },
                  });
                }
                if (e.target.value.includes("blue")) {
                  dispatch({
                    type: "SET",
                    payload: {
                      alliance: "blue",
                    },
                  });
                } else {
                  dispatch({
                    type: "SET",
                    payload: {
                      alliance: "red",
                    },
                  });
                }
              }}
            />
          </div>
        </div>
        {/* Match info section */}
        <div className="border-2 border-dark dark:border-light rounded-lg flex-grow flex flex-col">
          <div className="text-sm ml-1 justify-self-start underline">
            Match Information
          </div>
          <div className="flex flex-col justify-between gap-2 flex-1">
            <div className="flex flex-col xs:flex-row justify-between gap-2 p-2 xs:flex-1 max-h-32">
              <ShortTextInput
                label={"Match Number"}
                placeholder={"Enter the match # here"}
                stateProp={"matchNumber"}
                type="number"
                className={"flex-1"}
              />
              <DropdownInput
                label={"Match Level"}
                options={matchLevels}
                stateProp={"matchLevel"}
                className={"flex-1"}
              />
            </div>
            {state.scoutingType === "qualitative" ? (
              <div className="flex flex-col xs:flex-row justify-evenly xs:h-20 p-2 gap-2 xs:flex-1 max-h-32">
                {state.qualitativeTeams.map((team, index) => (
                  <ShortTextInput
                    label={"Team " + (index + 1) + " number"}
                    placeholder={"Enter team number here"}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_IN_QUAL",
                        index: index,
                        payload: { team: e.target.value },
                      });
                    }}
                    value={team.team}
                    key={index}
                    type="number"
                  />
                ))}
              </div>
            ) : (
              <ShortTextInput
                label={"Team Number"}
                placeholder={"Enter team number here"}
                stateProp={"team"}
                className={"p-2 xs:flex-1 max-h-32"}
                type="number"
              />
            )}
            <Button //only works with qualitative matches
              label={
                "Autofill Team Number" +
                (state.scoutingType === "qualitative" ? "s" : "")
              }
              onClick={handleTeamNumberAutofill}
              disabled={!canAutofillTeamNumber()}
              className={"m-2 xs:flex-1 max-h-32"}
            />
          </div>
        </div>
      </div>
      {/* Buttons on the right side */}
      <div className="w-full min-w-20 xs:w-[10%] flex flex-row xs:flex-col p-1">
        <Button
          label={"⚙️"}
          color="blue"
          className="text-2xl flex-grow"
          onClick={() => {
            dispatch({ type: "SET", payload: { mode: "Settings" } });
          }}
        />
        <Button
          label={"🕑"}
          color="amber"
          className="text-2xl flex-grow"
          onClick={() => {
            dispatch({ type: "SET", payload: { mode: "PastMatches" } });
          }}
        />
        <NextButton className={"flex-grow"} disabled={!canGoNext()} />
      </div>
    </div>
  );
};

export default Configure;
