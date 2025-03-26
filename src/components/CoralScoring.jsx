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
 * A button that increments the coral scoring state state when clicked
 *
 * @param {*} { phase, stateKey, label, color, handleClose }
 * @returns {*}
 */
const CoralScoringButton = ({ phase, stateKey, label, color }) => {
  const [state, dispatch] = useAppState();
  return (
    <Button
      color={color}
      onClick={() => {
        dispatch({
          type: "INCREMENT_IN_PHASE",
          phase: phase === "auto" || phase === "teleop" ? phase : "teleop", // if its not auto or teleop then its teleop
          key: stateKey,
        });
      }}
      className={
        "flex-1 relative flex flex-row justify-between items-center [&&]:px-1"
      }
    >
      <div className="text-2xl">
        {state[phase][stateKey] === 0 ? "" : state[phase][stateKey]}
      </div>
      <div>{label}</div>
    </Button>
  );
};

export default CoralScoring;
