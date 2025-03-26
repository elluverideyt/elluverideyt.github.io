import React, { useEffect, useState } from "react";
import { reviewToggles } from "../constants";
import { useAppState } from "../state/state";
import Button from "./inputs/Button";
import NextButton from "./inputs/button_variants/NextButton";
import Checkbox from "./inputs/Checkbox";
import LongTextInput from "./inputs/LongTextInput";
import Slider from "./inputs/Slider";

const Review = () => {
  const [state, dispatch] = useAppState();
  const [didDefense, setDidDefense] = useState(state.defense !== "");

  return (
    <div className="flex flex-col xs:flex-row justify-stretch items-stretch w-full h-full p-1 gap-2">
      {/* Toggle Option Section */}
      <div className="flex flex-col border border-dark rounded-lg p-2 gap-5">
        <h1 className="font-bold text-xl">Review</h1>
        <Checkbox
          label={"Defense?"}
          value={didDefense}
          onChange={(e) => {
            setDidDefense(!didDefense);
            if (!didDefense) {
              dispatch({
                type: "SET",
                payload: { defense: "" },
              });
            }
          }}
          className={"text-lg"}
        ></Checkbox>
        {didDefense && (
          // defense slider
          <LongTextInput
            stateProp={"defense"}
            placeholder={"Enter details about defense and its quality here"}
            className={"text-sm flex-grow"}
          />
        )}
        {
          // checkboxes
          reviewToggles.map((toggle, index) => (
            <Checkbox
              key={index}
              label={toggle.label}
              stateProp={toggle.key}
              className={"text-lg"}
            />
          ))
        }
        {/* Scouting error description section */}
        {state.hasScoutingErrors && (
          <LongTextInput
            stateProp={"scoutingErrors"}
            placeholder={"Describe your scouting errors here"}
            className={"text-sm flex-grow"}
          />
        )}
      </div>
      {/* Comments Section */}
      <div className="flex-grow flex flex-col">
        <LongTextInput
          label={"Comments"}
          stateProp={"comments"}
          placeholder={"Enter any comments here"}
          className={"text-base flex-1"}
        />
      </div>
      {/* Buttons Section */}
      <div className="w-full xs:w-20 flex flex-row xs:flex-col justify-between gap-2 h-[10%] xs:h-full">
        <Button
          label={"Edit"}
          color="blue"
          onClick={() => {
            dispatch({ type: "SET", payload: { mode: "Edit" } });
          }}
          className={"flex-1"}
        />
        <NextButton
          className={"flex-1"}
          disabled={
            state.comments.length < 5 ||
            (didDefense ? state.defense.length < 5 : false)
          }
          disabledMessage={"Comments need more than 5 characters"}
        />
      </div>
    </div>
  );
};

export default Review;
