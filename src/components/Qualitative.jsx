import React from "react";
import { useAppState } from "../state/state";
import QualitativeOption from "./inputs/QualitativeOption";
import Button from "./inputs/Button";
import NextButton from "./inputs/button_variants/NextButton";

const Qualitative = () => {
  const [state, dispatch] = useAppState();

  const border = "border border-gray-300 p-2";
  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-[100px_auto_auto] grid-rows-[50px_auto_auto_auto] text-center flex-grow">
        <div className={border} key={"team"}>
          Team
        </div>
        <div className={border} key={"quickness"}>
          Quickness
        </div>
        <div className={border} key={"fieldAwareness"}>
          Field Awareness
        </div>
        {state.qualitativeTeams.map((team, index) => (
          <>
            <div
              key={"team" + index}
              className={
                border +
                " flex flex-col justify-center text-2xl font-bold relative bg-opacity-30 " +
                (state.alliance === "blue" ? "bg-blue-500" : "bg-red-500")
              }
            >
              <div className="text-xs absolute top-1 left-1">
                {state.alliance} {index + 1}
              </div>
              <div>{team.team}</div>
            </div>
            <QualitativeOption
              key={"quickness" + index}
              className={border}
              team={team}
              stateProp={"quickness"}
            />
            <QualitativeOption
              key={"fieldAwareness" + index}
              className={border}
              team={team}
              stateProp={"fieldAwareness"}
            />
          </>
        ))}
      </div>
      <NextButton className={"w-full h-1/6"} />
    </div>
  );
};

export default Qualitative;
