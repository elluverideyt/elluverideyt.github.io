import React from "react";
import { useAppState } from "../../state/state";

/**
 * A simple checkbox component
 *
 * @param {*} {
 *   label,
 *   onChange,
 *   value,
 *   stateProp,
 *   phase,
 *   className,
 *   ...rest
 * }
 * @returns {*}
 */
const Checkbox = ({
  label,
  onChange,
  value,
  stateProp,
  phase,
  className,
  ...rest
}) => {
  const [state, dispatch] = stateProp ? useAppState() : [null, null]; // no need to call use App State if we don't have a state prop

  const handleChange = (e) => {
    if (stateProp) {
      // if we have a state prop to set, we set that on change
      if (phase) {
        dispatch({
          type: "TOGGLE_IN_PHASE",
          phase,
          key: stateProp,
        });
      } else {
        dispatch({
          type: "TOGGLE",
          payload: stateProp,
        });
      }
    }
    onChange && onChange(e);
  };

  return (
    <label className={"inline-flex items-center cursor-pointer " + className}>
      <input
        type="checkbox"
        value=""
        className=""
        checked={value ?? (phase ? state[phase][stateProp] : state[stateProp])}
        onChange={handleChange}
      />
      <span className="ms-3 text-md font-medium text-gray-900 dark:text-gray-300">
        {label}
      </span>
    </label>
  );
};

export default Checkbox;
