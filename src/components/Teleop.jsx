import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { coralIcon } from "../assets";
import { useAppState, useSettings } from "../state/state";
import AlgaeActionMenu from "./AlgaeActionMenu";
import CoralScoring from "./CoralScoring";
import Button from "./inputs/Button";

const Teleop = () => {
  const [state, dispatch] = useAppState();
  const [algaeActionMenu, setAlgaeActionMenu] = useState(false);
  const [settings] = useSettings();

  return (
    <div className="flex flex-col xs:flex-row h-full p-2 gap-2 bg-blue-500 bg-opacity-15 max-w-full overflow-x-auto">
      <Button
        label={"Back to Auto"}
        color="blue"
        className={"h-1/6 xs:w-1/6 xs:h-auto"}
        onClick={() => {
          dispatch({ type: "SET_PHASE", phase: "auto" });
        }}
      />
      <AlgaeActionMenu phase={"teleop"} />
      <CoralScoring phase="teleop" />
      <Button
        label={"End Teleop"}
        color="green"
        className={"h-1/6 xs:w-1/6 xs:h-auto"}
        onClick={() => {
          dispatch({ type: "SET_PHASE", phase: "endgame" });
        }}
      />
    </div>
  );
};

export default Teleop;
