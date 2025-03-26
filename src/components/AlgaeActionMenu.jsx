import React from "react";
import {
  algaeToNetIcon,
  algaeToProcessorIcon,
  removeAlgaeIcon,
} from "../assets";
import { useAppState } from "../state/state";
import Button from "./inputs/Button";

const AlgaeActionMenu = ({ phase }) => {
  const [state, dispatch] = useAppState();
  return (
    <div className="flex flex-row xs:flex-col h-1/6 xs:h-full gap-2 xs:flex-1">
      <Button
        color="green"
        className={"h-full xs:h-1/3 relative"}
        onClick={() => {
          dispatch({
            type: "INCREMENT_IN_PHASE",
            phase: phase,
            key: "algaeRemoved",
          });
        }}
      >
        <div className="absolute top-2 z-10 left-1/2 -translate-x-1/2 w-full drop-shadow-[0_0_1.2px_rgba(0,0,0,1)]">
          Algae Removal
        </div>
        <div className="flex-1 relative w-1/3 mx-auto">
          <img src={removeAlgaeIcon} className="full flex-1 z-10" />
        </div>
        <div className="text-center absolute bottom-0 left-1/2 transform -translate-x-1/2 text-2xl z-10 drop-shadow-[0_0_1.2px_rgba(0,0,0,1)]">
          {state[phase].algaeRemoved}
        </div>
      </Button>
      <Button
        color="green"
        className={"h-full xs:h-1/3 relative"}
        onClick={() => {
          dispatch({
            type: "INCREMENT_IN_PHASE",
            phase: phase,
            key: "algaeInNet",
          });
        }}
      >
        <div className="absolute top-2 z-10 left-1/2 -translate-x-1/2 w-full drop-shadow-[0_0_1.2px_rgba(0,0,0,1)]">
          Algae in Net
        </div>
        <div className="h-1/3 relative w-full">
          <img src={algaeToNetIcon} className="object-contain w-full flex-1" />
        </div>
        <div className="text-center absolute bottom-0 left-1/2 transform -translate-x-1/2 text-2xl z-10 drop-shadow-[0_0_1.2px_rgba(0,0,0,1)]">
          {state[phase].algaeInNet}
        </div>
      </Button>
      <Button
        color="green"
        className={"h-full xs:h-1/3 relative"}
        onClick={() => {
          dispatch({
            type: "INCREMENT_IN_PHASE",
            phase: phase,
            key: "algaeInProcessor",
          });
        }}
      >
        <div className="absolute top-2 z-10 left-1/2 -translate-x-1/2 w-full drop-shadow-[0_0_1.2px_rgba(0,0,0,1)]">
          Algae in Processor
        </div>
        <div className="flex-1 relative w-full">
          <img
            src={algaeToProcessorIcon}
            className="object-contain w-full flex-1"
          />
        </div>
        <div className="text-center absolute bottom-0 left-1/2 transform -translate-x-1/2 text-2xl z-10 drop-shadow-[0_0_1.2px_rgba(0,0,0,1)]">
          {state[phase].algaeInProcessor}
        </div>
      </Button>
    </div>
  );
};

export default AlgaeActionMenu;
