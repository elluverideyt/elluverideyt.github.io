import React, { useState } from "react";
import Button from "../Button";

const ResetButton = ({
  onClick,
  className,
  label = "Reset",
  confirmLabel = "Confirm Reset",
  ...rest
}) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (!clicked) {
      setClicked(true);
    } else {
      onClick && onClick();
    }
  };

  return (
    <Button
      color="red"
      label={clicked ? confirmLabel : label}
      onClick={handleClick}
      {...rest}
      className={className + " "}
    />
  );
};

export default ResetButton;
