import React, { useState } from "react";
import { useAppState } from "../../state/state";

/**
 * A multiline text input
 *
 * @param {*} {
 *   fillColor,
 *   label,
 *   value,
 *   placeholder,
 *   onChange,
 *   axis = "vertical",
 *   stateProp,
 *   className,
 *   ...rest
 * }
 * @returns {*}
 */
const LongTextInput = ({
  fillColor,
  label,
  value,
  placeholder,
  onChange,
  axis = "vertical",
  stateProp,
  className,
  ...rest
}) => {
  const [state, dispatch] = stateProp ? useAppState() : [null, null]; // no need to call use App State if we don't have a state prop

  const handleChange = (e) => {
    if (stateProp) {
      // if we have a state prop to set, we set that on change
      dispatch({
        type: "SET",
        payload: {
          [stateProp]: e.target.value,
        },
      });
    }
    onChange && onChange(e);
  };

  return (
    <div
      className={
        `flex ${axis === "horizontal" ? "flex-row" : "flex-col"} ${
          fillColor ? `bg-${fillColor}` : ""
        } ` + className
      }
    >
      {label && <label htmlFor={label}>{label}</label>}
      <textarea
        id={label}
        placeholder={placeholder ?? label}
        value={(stateProp ? state[stateProp] : value) ?? ""} // if were given a state prop, we use that, otherwise we use the value prop
        onChange={handleChange}
        className="rounded-md w-full border border-dark dark:border-light dark:bg-black flex-grow px-1"
        {...rest}
      />
    </div>
  );
};

export default LongTextInput;
