import React, { useState } from "react";
import { useAppState } from "../state/state";
import Button from "./inputs/Button";
import ShortTextInput from "./inputs/ShortTextInput";

const EndgameClimbMenu = () => {
  const [state, dispatch] = useAppState();

  const attemptedClimb = (overrideVals) => {
    const endgame = { ...state.endgame, ...overrideVals };
    return (
      endgame.climbStartTime ||
      endgame.climbSuccessful !== undefined ||
      endgame.climbingCage !== undefined
    );
  };

  const handleAttemptedClimb = () => {
    dispatch({
      type: "SET_IN_PHASE",
      phase: "endgame",
      payload: { attemptedClimb: true },
    });
  };

  return (
    <div className="flex flex-col gap-2 flex-1">
      <ShortTextInput
        label={"Climb Start Time"}
        type="number"
        placeholder={"Enter current time here"}
        className={"h-1/3"}
        stateProp={"climbStartTime"}
        phase={"endgame"}
        onChange={(e) => {
          dispatch({
            type: "SET_IN_PHASE",
            phase: "endgame",
            payload: {
              attemptedClimb: attemptedClimb({
                climbStartTime: e.target.value,
              }),
            },
          });
        }}
      />
      <div className="grid grid-rows-2 grid-flow-col gap-2 h-2/3">
        <Button
          label={"Shallow"}
          color="blue"
          className={
            "flex-1 " +
            (state.endgame.climbingCage !== "shallow"
              ? "bg-blue-900 opacity-50"
              : "")
          }
          onClick={() => {
            // toggle it
            if (state.endgame.climbingCage === "shallow") {
              dispatch({
                type: "SET_IN_PHASE",
                phase: "endgame",
                payload: {
                  climbingCage: undefined,
                  attemptedClimb: attemptedClimb({ climbingCage: undefined })
                    ? true
                    : false,
                },
              });
            } else {
              dispatch({
                type: "SET_IN_PHASE",
                phase: "endgame",
                payload: { climbingCage: "shallow", attemptedClimb: true },
              });
            }
            console.log(state);
          }}
        />
        <Button
          label={"Deep"}
          color="blue"
          className={
            "flex-1 " +
            (state.endgame.climbingCage !== "deep"
              ? "bg-blue-900 opacity-50"
              : "")
          }
          onClick={() => {
            // toggle it
            if (state.endgame.climbingCage === "deep") {
              dispatch({
                type: "SET_IN_PHASE",
                phase: "endgame",
                payload: {
                  climbingCage: undefined,
                  attemptedClimb: attemptedClimb({ climbingCage: undefined })
                    ? true
                    : false,
                },
              });
            } else {
              dispatch({
                type: "SET_IN_PHASE",
                phase: "endgame",
                payload: { climbingCage: "deep", attemptedClimb: true },
              });
            }
          }}
        />
        <Button
          label={"Fail"}
          color="red"
          className={
            "flex-1 " +
            (state.endgame.climbSuccessful !== false
              ? "bg-red-900 opacity-50"
              : "")
          }
          onClick={() => {
            // toggle it
            if (state.endgame.climbSuccessful === false) {
              dispatch({
                type: "SET_IN_PHASE",
                phase: "endgame",
                payload: {
                  climbSuccessful: undefined,
                  attemptedClimb: attemptedClimb({ climbSuccessful: undefined })
                    ? true
                    : false,
                },
              });
            } else {
              dispatch({
                type: "SET_IN_PHASE",
                phase: "endgame",
                payload: { climbSuccessful: false, attemptedClimb: true },
              });
            }
          }}
        />
        <Button
          label={"Success"}
          color="green"
          className={
            "flex-1 " +
            (state.endgame.climbSuccessful !== true
              ? "bg-green-900 opacity-50"
              : "")
          }
          onClick={() => {
            // toggle it
            if (state.endgame.climbSuccessful === true) {
              dispatch({
                type: "SET_IN_PHASE",
                phase: "endgame",
                payload: {
                  climbSuccessful: undefined,
                  attemptedClimb: attemptedClimb({ climbSuccessful: undefined })
                    ? true
                    : false,
                },
              });
            } else {
              dispatch({
                type: "SET_IN_PHASE",
                phase: "endgame",
                payload: {
                  climbSuccessful: true,
                  attemptedClimb: true,
                  park: false,
                },
              });
            }
          }}
        />
      </div>
    </div>
  );
};

export default EndgameClimbMenu;
