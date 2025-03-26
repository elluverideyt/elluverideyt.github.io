import React from "react";
import { triggerHapticFeedback } from "../../../api/hapticFeedbackApi";
import { useAppState } from "../../../state/state";
import Button from "../Button";

const NextButton = ({ ...rest }) => {
  const [state, dispatch] = useAppState();
  return (
    <Button
      label={"Next"}
      color="green"
      animate={false}
      onClick={() => {
        triggerHapticFeedback();
        dispatch({ type: "NEXT_MODE" });
      }}
      {...rest}
    />
  );
};

export default NextButton;
