import { settingsReducer } from "../state/settingsReducer";

describe("settingsReducer", () => {
  // add settingsReducer tests here
  it("should set the settings", () => {
    const initialState = {
      darkMode: false,
    };
    const action = { type: "SET", payload: { darkMode: true } };
    const newState = settingsReducer(initialState, action);
    expect(newState.darkMode).toBe(true);
  });
});
