import React, { useEffect, useMemo, useState } from "react";
import QRCode from "react-qr-code";
import { stateToCsv } from "../api/csvApi";
import { getPastMatches } from "../api/pastMatchesApi";
import { enableMemes } from "../constants";
import { useAppState, useSettings } from "../state/state";
import AddToGoogleSheetButton from "./inputs/AddToGoogleSheetButton";
import Button from "./inputs/Button";

const PastMatches = () => {
  const [state, dispatch] = useAppState();
  const [settings] = useSettings();
  const [pastMatches, setPastMatches] = useState(getPastMatches());
  const [displayedMatchIndex, setDisplayedMatchIndex] = useState(0);

  const value = useMemo(
    () =>
      pastMatches.length !== 0
        ? stateToCsv(pastMatches[displayedMatchIndex])
        : "you aren't sigma, theres nothing here dog",
    [displayedMatchIndex, pastMatches]
  );

  // set us to be default to showing the last match
  useEffect(() => {
    setDisplayedMatchIndex(pastMatches.length - 1);
  }, [pastMatches]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col xs:flex-row flex-1 h-3/4">
        {/* Side menu */}
        <div className="overflow-x-auto xs:overflow-y-auto h-1/4 w-full xs:w-1/4 xs:h-full">
          <div className="flex flex-row-reverse xs:flex-col-reverse justify-end gap-1">
            {pastMatches?.map((match, index) => (
              <Button
                key={index}
                color={index === displayedMatchIndex ? "blue" : "gray"}
                onClick={() => setDisplayedMatchIndex(index)}
                className={"w-full"}
              >
                <div>Match #{match.matchNumber}</div>
                <div>Role: {match.role}</div>
                <div>Team: {match.team}</div>
              </Button>
            ))}
            {
              // If we have no past matches, display a message
              pastMatches.length === 0 && (
                <div className="text-center">No past matches</div>
              )
            }
          </div>
        </div>
        {/* QR Code */}
        <div className="bg-white p-2">
          <QRCode
            value={
              settings.rickRoll && enableMemes // its just for the memes
                ? "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                : value
            }
            className="h-full w-full"
          />
        </div>
        <AddToGoogleSheetButton value={value} className={"flex-grow flex-1"} />
      </div>

      <Button
        label={"Back"}
        color="blue"
        onClick={() => {
          dispatch({ type: "SET", payload: { mode: "Configure" } });
        }}
        className={"w-full"}
      />
    </div>
  );
};

export default PastMatches;
