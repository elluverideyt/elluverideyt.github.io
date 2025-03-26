import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useAppState, useSettings } from "../state/state";
import Auto from "./Auto";
import Endgame from "./Endgame";
import Button from "./inputs/Button";
import NextButton from "./inputs/button_variants/NextButton";
import ScoutInfoBar from "./ScoutInfoBar";
import Teleop from "./Teleop";

const phases = ["auto", "teleop", "endgame"];

const Scout = () => {
  const [state] = useAppState();
  const [settings] = useSettings();
  const previousPhaseRef = useRef(state.phase);

  const pageVariants = {
    initial: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
    }),
    animate: {
      x: 0,
      transition: {
        duration: 0.3,
        type: "spring",
        damping: 30,
        stiffness: 150,
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      transition: {
        duration: 0.3,
        type: "spring",
        damping: 30,
        stiffness: 150,
      },
    }),
  };

  const direction =
    phases.indexOf(state.phase) - phases.indexOf(previousPhaseRef.current);

  useEffect(() => {
    previousPhaseRef.current = state.phase;
  }, [state.phase]);

  return (
    <div className="flex flex-col h-full relative w-full overflow-hidden">
      <ScoutInfoBar />
      {settings.scoutingPageTransitions ? (
        <div className="flex-1 relative">
          <AnimatePresence initial={false} custom={direction}>
            {state.phase === "auto" ? (
              <motion.div
                key="auto"
                custom={direction}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute w-full h-full top-0 left-0"
              >
                <Auto />
              </motion.div>
            ) : state.phase === "teleop" ? (
              <motion.div
                key="teleop"
                custom={direction}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute w-full h-full top-0 left-0"
              >
                <Teleop />
              </motion.div>
            ) : state.phase === "endgame" ? (
              <motion.div
                key="endgame"
                custom={direction}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute w-full h-full top-0 left-0"
              >
                <Endgame />
              </motion.div>
            ) : (
              <div key="error">You messed up</div>
            )}
          </AnimatePresence>
        </div>
      ) : state.phase === "auto" ? (
        <Auto key={"auto"} />
      ) : state.phase === "teleop" ? (
        <Teleop key={"teleop"} />
      ) : state.phase === "endgame" ? (
        <Endgame key={"endgame"} />
      ) : (
        <div key="error">You messed up</div>
      )}
    </div>
  );
};

export default Scout;
