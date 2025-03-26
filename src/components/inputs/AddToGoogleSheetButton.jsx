import React, { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { submitToGoogleSheet } from "../../api/googleSheetApi";
import { useAppState, useSettings } from "../../state/state";
import Button from "./Button";
import ResetButton from "./button_variants/ResetButton";

const AddToGoogleSheetButton = ({ value, className, ...rest }) => {
  const [settings] = useSettings();
  const [state, dispatch] = useAppState();
  const [googleSheetSubmitStatus, setGoogleSheetSubmitStatus] =
    useState("none"); // none, pending, success, error will be in the status

  return (
    <>
      {/* Google Sheet status modal */}
      {googleSheetSubmitStatus !== "none" && (
        <div className="absolute w-full h-full bg-black bg-opacity-50 text-center flex flex-col justify-center items-center z-50">
          <div className="w-1/2 bg-black rounded-lg p-2 text-white">
            {googleSheetSubmitStatus === "pending" ? (
              <>
                <div className="font-bold m-2">Submitting...</div>
                <ResetButton
                  className={"text-lg"}
                  onClick={() => {
                    setGoogleSheetSubmitStatus("none");
                  }}
                  label="Close"
                  confirmLabel="Confirm Close"
                />
              </>
            ) : googleSheetSubmitStatus === "success" ? (
              <>
                {settings.stimulation && (
                  <ConfettiExplosion
                    className="absolute left-1/2"
                    particleCount={250}
                    force={0.8}
                    duration={3000}
                    zIndex={1000}
                    width={1000}
                    height={1000}
                  />
                )}
                <div className="font-bold m-2 text-3xl">Success!</div>
                <ResetButton
                  className={"text-lg"}
                  onClick={() => {
                    dispatch({
                      type: "RESET",
                      increaseMatch: settings.autoIncreaseMatch,
                    });
                  }}
                  label="Reset and Close"
                  confirmLabel="Confirm Reset and Close"
                />
              </>
            ) : (
              <>
                <div className="font-bold m-2 text-3xl">
                  {googleSheetSubmitStatus}
                  <br />
                  Manually scan the QR Code
                </div>
                <ResetButton
                  className={"text-lg"}
                  onClick={() => {
                    setGoogleSheetSubmitStatus("none");
                  }}
                  label="Close"
                  confirmLabel="Confirm Close"
                />
              </>
            )}
          </div>
        </div>
      )}
      {/* Add to google sheet button */}
      <Button
        onClick={() => {
          console.log("Add to Google Sheet");
          setGoogleSheetSubmitStatus("pending");
          submitToGoogleSheet(
            value,
            settings.googleSheetLink,
            state.scoutingType === "qualitative"
              ? settings.googleSheetTabQual
              : settings.googleSheetTab,
            settings.googleSheetColNumber
          )
            .then((result) => {
              console.log("Result", result);
              setGoogleSheetSubmitStatus("success");
            })
            .catch((error) => {
              console.error("Error", error);
              setGoogleSheetSubmitStatus(error.message);
            });
        }}
        color={"green"}
        label={"Add to Google Sheet"}
        className={className}
        {...rest}
      ></Button>
    </>
  );
};

export default AddToGoogleSheetButton;
