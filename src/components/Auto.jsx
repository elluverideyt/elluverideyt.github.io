import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useAppState, useSettings } from "../state/state";
import AlgaeActionMenu from "./AlgaeActionMenu";
import CoralScoring from "./CoralScoring";
import Button from "./inputs/Button";

const Auto = () => {
  const [state, dispatch] = useAppState();
  const [algaeActionMenu, setAlgaeActionMenu] = useState(false);
  const [settings] = useSettings();

  return (
    <div className="flex flex-col xs:flex-row p-2 gap-2 bg-red-500 bg-opacity-15 relative h-full max-w-full overflow-x-auto">
      <Button
        label={state.auto.leave ? "Robot Left" : "Robot Leave?"}
        color="red"
        disabled={state.auto.leave}
        className={"h-1/6 xs:w-1/6 xs:h-auto"}
        onClick={() => {
          dispatch({
            type: "SET_IN_PHASE",
            phase: "auto",
            payload: { leave: true },
          });
        }}
      />
      <AlgaeActionMenu phase="auto" />
      <CoralScoring phase="auto" />
      <Button
        label={"End Auto"}
        color="green"
        className={"h-1/6 xs:w-1/6 xs:h-auto"}
        onClick={() => {
          dispatch({ type: "SET_PHASE", phase: "teleop" });
        }}
      />
    </div>
  );
};

export default Auto;
