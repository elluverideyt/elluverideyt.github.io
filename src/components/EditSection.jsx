import React from "react";
import Checkbox from "./inputs/Checkbox";
import DropdownInput from "./inputs/DropdownInput";
import ShortTextInput from "./inputs/ShortTextInput";

const EditSection = ({ section, phase }) => {
  return (
    <div className="border border-gray-300 p-2 rounded-lg">
      {/* Title */}
      <h2 className="text-xl">{section.label}</h2>
      {/* Fields */}
      <div className="flex flex-col gap-2 p-4">
        {section.fields.map((field) => {
          if (field.fields) {
            return (
              <EditSection key={field.key} section={field} phase={field.key} />
            );
          }
          switch (field.type) {
            case "text":
              return (
                <ShortTextInput
                  label={field.label}
                  type={field.type}
                  stateProp={field.key}
                  phase={phase}
                  placeholder={"Enter " + field.label}
                  key={field.key}
                />
              );
            case "number":
              return (
                <ShortTextInput
                  label={field.label}
                  type={field.type}
                  stateProp={field.key}
                  phase={phase}
                  placeholder={"Enter " + field.label}
                  key={field.key}
                />
              );
            case "dropdown":
              return (
                <DropdownInput
                  label={field.label}
                  options={field.options}
                  stateProp={field.key}
                  key={field.key}
                  phase={phase}
                />
              );
            case "checkbox":
              return (
                <Checkbox
                  label={field.label}
                  stateProp={field.key}
                  phase={phase}
                  key={field.key}
                />
              );
          }
        })}
      </div>
    </div>
  );
};

export default EditSection;
