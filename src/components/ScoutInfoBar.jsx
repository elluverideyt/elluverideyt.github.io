import React from "react";
import { useAppState } from "../state/state";
import Button from "./inputs/Button";

const ScoutInfoBar = () => {
  const [state, dispatch] = useAppState();
  return (
    <div
      className={
        "h-[15vh] flex flex-row justify-between p-2 items-center bg-opacity-40 " +
        (state.alliance === "red" ? "bg-red-500" : "bg-blue-500")
      }
    >
      <div>Match: {state.matchNumber}</div>
      <div>Team: {state.team}</div>
      <div>Scouter: {state.scouterName}</div>
      <div>Phase: {state.phase}</div>
      <Button
        label={"Undo"}
        color="gray"
        className={"text-sm"}
        onClick={() => {
          dispatch({ type: "UNDO" });
        }}
      />
    </div>
  );
};

export default ScoutInfoBar;
