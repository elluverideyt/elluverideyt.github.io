import React from "react";
import { editViewSections } from "../constants";
import { useAppState } from "../state/state";
import EditSection from "./EditSection";
import Button from "./inputs/Button";

const Edit = () => {
  const [state, dispatch] = useAppState();
  return (
    <div className="flex flex-col h-full">
      <div className="overflow-y-scroll flex-grow">
        <h1 className="text-3xl text-center m-4">Edit</h1>
        {editViewSections.map((section) => (
          <EditSection key={section.label} section={section} />
        ))}
      </div>
      <Button
        label={"Back"}
        color="blue"
        onClick={() => {
          dispatch({ type: "SET", payload: { mode: "Review" } });
        }}
        className={"w-full bottom-0"}
      />
    </div>
  );
};

export default Edit;
