import React, { useMemo } from "react";
import { version } from "../../package.json";
import { enableMemes } from "../constants";
import { settingsInfo } from "../state/settingsReducer";
import { useAppState, useSettings } from "../state/state";
import Button from "./inputs/Button";
import DropdownInput from "./inputs/DropdownInput";
import ShortTextInput from "./inputs/ShortTextInput";
import ToggleButton from "./inputs/ToggleButton";

const Settings = () => {
  const [settings, dispatchSettings] = useSettings();
  const [state, dispatch] = useAppState();

  return (
    <div className="flex flex-col items-center relative overflow-hidden">
      <div className="absolute top-2 left-2">
        <Button
          label={"Back"}
          className="absolute top-2 left-2"
          onClick={() => {
            dispatch({ type: "SET", payload: { mode: "Configure" } });
          }}
        />
      </div>
      <div className="text-2xl font-bold mt-4">Settings</div>
      <div className="text-xs mb-4">Version {version}</div>
      <div className="flex flex-col overflow-scroll flex-1">
        {settingsInfo.map((infoSection, index) => {
          if (enableMemes === false && infoSection.section === "Memes") {
            return null;
          }
          return (
            <div
              key={infoSection.section}
              className="border-white border-2 flex flex-col m-1 rounded-lg"
            >
              <div
                className={
                  "text-xl font-bold text-center m-4" +
                  (infoSection.section === "Memes"
                    ? " bg-gradient-to-tr from-pink-400 to-violet-700 text-transparent bg-clip-text w-fit mx-auto after:content-['✨']"
                    : "")
                }
              >
                {infoSection.section}
              </div>
              {infoSection.settings.map((settingInfo, index) => {
                return (
                  <div key={index} className="m-2">
                    {settingInfo.type === "boolean" ? (
                      <ToggleButton
                        onChange={() => {
                          dispatchSettings({
                            type: "TOGGLE",
                            payload: settingInfo.key,
                          });
                        }}
                        value={settings[settingInfo.key]}
                        label={settingInfo.name}
                      />
                    ) : settingInfo.type === "string" ? (
                      <ShortTextInput
                        label={settingInfo.name}
                        value={settings[settingInfo.key]}
                        onChange={(e) => {
                          dispatchSettings({
                            type: "SET",
                            payload: { [settingInfo.key]: e.target.value },
                          });
                        }}
                      />
                    ) : settingInfo.type === "dropdown" ? (
                      <DropdownInput
                        label={settingInfo.name}
                        options={settingInfo.options}
                        value={settings[settingInfo.key]}
                        onChange={(e) => {
                          dispatchSettings({
                            type: "SET",
                            payload: { [settingInfo.key]: e.target.value },
                          });
                        }}
                      />
                    ) : (
                      <div>Unsupported type</div>
                    )}
                    <div className="text-xs m-2">{settingInfo.description}</div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Settings;
