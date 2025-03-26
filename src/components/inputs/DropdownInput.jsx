import React from "react";
import { useAppState } from "../../state/state";

/**
 * A dropdown input component
 *
 * @param {*} {
 *   fillColor,
 *   label,
 *   options,
 *   onChange,
 *   value,
 *   axis = "vertical",
 *   stateProp,
 *   className,
 *   ...rest
 * }
 * @returns {*}
 */
const DropdownInput = ({
  fillColor,
  label,
  options,
  onChange,
  value,
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
          fillColor ? "bg-" + fillColor : ""
        } ` + className
      }
    >
      <label>{label}</label>
      <select
        value={stateProp ? state[stateProp] : value}
        onChange={handleChange}
        {...rest}
        className="rounded-md border border-dark bg-white dark:border-light dark:bg-black flex-grow"
      >
        {options.map((option, index) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownInput;
