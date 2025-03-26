import { useState, useEffect } from "react";
import { reefDiagram } from "../assets";
import { useAppState } from "../state/state";
import Button from "./inputs/Button";

/**
 * A component that allows the user to score coral
 * @param {*} { phase = "teleop" }
 * @returns {*}
 */
const CoralScoring = ({ phase = "teleop" }) => {
  return (
    <div className="max-w-full overflow-x-auto flex flex-row gap-2 flex-1">
      {/* insert svg of thingy here */}
      <img src={reefDiagram} className="h-auto" alt="reef diagram"></img>
      <div className="flex flex-col gap-2 flex-1">
        <CoralScoringButton
          phase={phase}
          stateKey={"coralScoredL4"}
          label={"Level 4"}
          color={"green"}
        />
        <CoralScoringButton
          phase={phase}
          stateKey={"coralScoredL3"}
          label={"Level 3"}
          color={"amber"}
        />
        <CoralScoringButton
          phase={phase}
          stateKey={"coralScoredL2"}
          label={"Level 2"}
          color={"amber"}
        />
        <CoralScoringButton
          phase={phase}
          stateKey={"coralScoredL1"}
          label={"Level 1"}
          color={"red"}
        />
      </div>
    </div>
  );
};

/**
 * A button that increments the coral scoring state when clicked.
 * For Levels 2, 3, and 4, the score won't exceed 8 and a popup is shown if already at limit.
 *
 * @param {*} { phase, stateKey, label, color }
 * @returns {*}
 */
const CoralScoringButton = ({ phase, stateKey, label, color }) => {
  const [state, dispatch] = useAppState();
  const [showPopup, setShowPopup] = useState(false);
  const currentValue = state[phase][stateKey];
  const hasLimit = ["coralScoredL4", "coralScoredL3", "coralScoredL2"].includes(stateKey);

  const handleClick = () => {
    if (hasLimit && currentValue >= 8) {
      setShowPopup(true);
      // Clear popup after 2 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
      return;
    }
    dispatch({
      type: "INCREMENT_IN_PHASE",
      phase: phase === "auto" || phase === "teleop" ? phase : "teleop", // if its not auto or teleop then its teleop
      key: stateKey,
    });
  };

  return (
    <div className="relative">
      <Button
        color={color}
        onClick={handleClick}
        className="flex-1 relative flex flex-row justify-between items-center [&&]:px-1"
      >
        <div className="text-2xl">
          {currentValue === 0 ? "" : currentValue}
        </div>
        <div>{label}</div>
      </Button>
      {showPopup && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm">
          Maximum reached. Undo if there were mistakes.
        </div>
      )}
    </div>
  );
};

export default CoralScoring;