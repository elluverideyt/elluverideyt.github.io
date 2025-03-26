import React, { useMemo } from "react";
import { useAppState } from "../state/state";
import Configure from "./Configure";
import Edit from "./Edit";
import PastMatches from "./PastMatches";
import Qualitative from "./Qualitative";
import Review from "./Review";
import ScanData from "./ScanData";
import Scout from "./Scout";
import Settings from "./Settings";

const CurrentMode = () => {
  const [state, dispatch] = useAppState();
  const renderedMode = useMemo(() => {
    switch (state.mode) {
      case "Configure":
        return <Configure />;
      case "Scout":
        return <Scout />;
      case "Review":
        return <Review />;
      case "Qualitative":
        return <Qualitative />;
      case "Settings":
        return <Settings />;
      case "ScanData":
        return <ScanData />;
      case "Edit":
        return <Edit />;
      case "PastMatches":
        return <PastMatches />;
      default:
        return (
          <div>
            <div>Someone, somewhere, fucked up majorly</div>
            <div>It was probably you</div>
          </div>
        );
    }
  }, [state.mode]);

  return renderedMode;
};

export default CurrentMode;
