import React from "react";
import { useAppState } from "../../state/state";
import Button from "./Button";

/**
 * A option containing 3 buttons for qualitative data
 *
 * @param {*} { team, stateProp, className }
 * @returns {*}
 */
const QualitativeOption = ({ team, stateProp, className }) => {
  const [state, dispatch] = useAppState();

  return (
    <div
      className={
        "flex flex-row justify-stretch items-stretch w-full gap-2 text-4xl " +
        className
      }
    >
      {[
        "bg-green-500 border-green-500",
        "bg-amber-500 border-amber-500",
        "bg-red-500 border-red-500",
      ].map((color, index) => {
        const buttonNumber = index + 1;
        const isSelected = team[stateProp] === buttonNumber;

        return (
          <button
            key={index}
            className={
              color +
              " border-2 font-bold rounded-lg transition-all duration-100 flex-grow " +
              (isSelected
                ? "bg-opacity-100 drop-shadow-lg scale-105"
                : "bg-opacity-10 border-opacity-30") +
              " focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-" +
              color.split(" ")[0].split("-")[1] +
              "500" // Dynamic focus ring color
            }
            onClick={() => {
              dispatch({
                type: "SET_IN_QUAL",
                index: state.qualitativeTeams.indexOf(team),
                payload: { [stateProp]: buttonNumber },
              });
            }}
          >
            {buttonNumber}
          </button>
        );
      })}
    </div>
  );
};

export default QualitativeOption;
