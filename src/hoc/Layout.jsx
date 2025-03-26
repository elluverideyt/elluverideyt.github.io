import React from "react";
import BackgroundGame from "../components/meme_components/BackgroundGame";
import SubwaySurfers from "../components/meme_components/SubwaySurfers";
import { enableMemes } from "../constants";
import { useSettings } from "../state/state";

const Layout = ({ children }) => {
  const [settings, settingsDispatch] = useSettings();

  return (
    <div className={settings.darkMode ? "dark" : ""}>
      <div className="font-body bg-light dark:bg-dark text-black dark:text-white w-screen h-screen transition-colors duration-500 overflow-scroll">
        {enableMemes && (
          <>
            {settings.subwaySurf && <SubwaySurfers />}
            {settings.displayBackgroundGame && <BackgroundGame />}
          </>
        )}
        {children}
      </div>
    </div>
  );
};

export default Layout;
