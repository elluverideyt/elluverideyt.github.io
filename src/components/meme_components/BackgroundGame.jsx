import React, { useState } from "react";
import { useSettings } from "../../state/state";

const BackgroundGame = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, settingsDispatch] = useSettings();

  return (
    <>
      <div
        className="fixed bottom-1/2 right-0 p-4 transform translate-y-1/2 bg-blue-400 rounded-lg opacity-80 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close" : "Open"}
      </div>
      <div
        className={
          "absolute h-screen w-screen opacity-90 z-20 " +
          (isOpen ? "visible" : "hidden")
        }
      >
        {settings.backgroundGame === "BlockBlast" ? (
          <iframe
            id="iframehtml5"
            width="100%"
            height="100%"
            frameborder="0"
            border="0"
            class="iframe-default"
            allow="autoplay; fullscreen; camera; focus-without-user-activation *; monetization; gamepad; keyboard-map *; xr-spatial-tracking; clipboard-write; web-share; accelerometer; magnetometer; gyroscope; display-capture"
            src="https://block-blast.io/game/block-blast/"
          ></iframe>
        ) : settings.backgroundGame === "Dino" ? (
          <iframe
            id="game-element"
            allowfullscreen=""
            allow="autoplay; fullscreen; camera; focus-without-user-activation *; monetization; gamepad; keyboard-map *; xr-spatial-tracking; clipboard-write; web-share; accelerometer; magnetometer; gyroscope; display-capture"
            name="gameFrame"
            width={"100%"}
            height={"100%"}
            scrolling="no"
            sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-same-origin allow-downloads"
            src="https://games.poki.com/458768/a4e4a244-d11b-4d94-b1d8-deb2dbbaff02?tag=pg-9551b1fb395dc7535d35465bb0dbce1e5a09497f&amp;site_id=3&amp;iso_lang=en&amp;country=US&amp;poki_url=https://poki.com/en/g/dinosaur-game&amp;hoist=yes&amp;nonPersonalized=n&amp;cloudsavegames=n&amp;familyFriendly=n&amp;categories=9,37,389,852,903,1126,1140,1159,1163,1190,1191,1193&amp;experiment=control-959a0db8&amp;special_condition=landing"
            title="Game"
          ></iframe>
        ) : settings.backgroundGame === "Minecraft" ? (
          <iframe
            allowfullscreen=""
            allow="autoplay; fullscreen; camera; focus-without-user-activation *; monetization; gamepad; keyboard-map *; xr-spatial-tracking; clipboard-write; web-share; accelerometer; magnetometer; gyroscope; display-capture"
            width={"100%"}
            height={"100%"}
            src="https://eaglercraft.com/mc/1.8.8/"
            sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-same-origin allow-downloads"
            scrolling="yes"
            title="Game"
          >
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
            ></meta>
          </iframe>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default BackgroundGame;
