import React, { useEffect, useMemo, useState } from "react";
import QRCode from "react-qr-code";
import { filterState, flattenState, stateToCsv } from "../api/csvApi";
import { saveMatch } from "../api/pastMatchesApi";
import { enableMemes } from "../constants";
import { useAppState, useSettings } from "../state/state";
import AddToGoogleSheetButton from "./inputs/AddToGoogleSheetButton";
import Button from "./inputs/Button";
import ResetButton from "./inputs/button_variants/ResetButton";

const ScanData = () => {
  const [state, dispatch] = useAppState();
  const [settings, settingsDispatch] = useSettings();

  // For debugging the scandata
  // useEffect(() => {
  //   console.log("State", state);
  //   console.log("Filtered", filterState(state));
  //   console.log("Flattened", flattenState(filterState(state)));
  //   console.log("CSV", stateToCsv(state));
  // });

  useEffect(() => {
    if (state) {
      saveMatch(state, dispatch);
    }
  }, [state]);

  const value = useMemo(() => stateToCsv(state), [state]);

  return (
    <div className="text-xl flex flex-col xs:flex-row h-full w-full">
      {settings.scoutingType === "match" && (
        <Button
          label={"Back"}
          className={"min-h-[10%] xs:h-full flex-1"}
          color="blue"
          onClick={() => {
            dispatch({ type: "SET", payload: { mode: "Review" } });
          }}
        />
      )}
      {/* Reset Button */}
      <ResetButton
        onClick={() => {
          dispatch({
            type: "RESET",
            increaseMatch: settings.autoIncreaseMatch,
          });
        }}
        className="min-h-[10%] xs:h-full flex-1"
      />
      {/* QR Code */}
      <div className="bg-white p-4 ">
        <QRCode
          value={
            settings.rickRoll && enableMemes // its just for the memes
              ? "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              : value
          }
          className="h-full w-full"
        />
      </div>
      <AddToGoogleSheetButton
        value={value}
        className={"min-h-[10%] xs:h-full flex-1"}
      />
    </div>
  );
};

export default ScanData;
