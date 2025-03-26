import { motion, stagger, useAnimate } from "framer-motion";
import React, { useRef } from "react";
import { ben } from "../../assets";
import { useSettings } from "../../state/state";

/**
 * A simple button component
 *
 * @param {*} {
 *   color = "blue",
 *   label,
 *   onClick,
 *   className,
 *   children,
 *   animate = true, // weather it animates (doesn't if the setting disable stimulation)
 *   ...rest
 * }
 * @return {*}
 */
const Button = ({
  color = "blue",
  label,
  onClick,
  className,
  children,
  animate = true, // weather it animates (doesn't if the setting disable stimulation)
  disabledMessage,
  ...rest
}) => {
  const [settings] = useSettings();

  const colorVariants = {
    blue: "bg-blue-500 border-blue-500 ",
    red: "bg-red-warning border-red-warning",
    green: "bg-green-500 border-green-500",
    amber: "bg-amber-500 border-amber-500",
    gray: "bg-gray-500 border-gray-500",
    turquoise: "bg-teal-500 border-teal-500",
  };
  const baseStyles =
    "text-white bg-opacity-90 dark:bg-opacity-50 hover:bg-opacity-90 border-2 font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:border-gray-500 relative ";

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <motion.button
      className={colorVariants[color] + " " + baseStyles + " " + className}
      onClick={handleClick}
      whileTap={
        settings.stimulation && !rest.disabled && animate
          ? { scale: 1.05 }
          : undefined
      }
      transition={
        settings.stimulation && !rest.disabled && animate
          ? { type: "spring", stiffness: 500, damping: 10 }
          : undefined
      }
      {...rest}
    >
      {settings.benMode && (
        <img
          src={ben}
          className="absolute w-full h-full left-0 top-0 opacity-50"
        ></img>
      )}
      <div className="relative">
        <div className={rest.disabled && disabledMessage ? "hidden" : ""}>
          {label}
        </div>
        {rest.disabled && disabledMessage !== null && (
          <div className="text-xs font-normal text-center">
            {disabledMessage}
          </div>
        )}
      </div>
      {children}
    </motion.button>
  );
};

export default Button;
