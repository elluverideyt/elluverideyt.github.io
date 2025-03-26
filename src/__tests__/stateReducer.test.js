import { initialState, stateReducer } from "../state/stateReducer";

describe("SET", () => {
  it("should set the state", () => {
    const initialState = {
      defense: false,
    };
    const action = { type: "SET", payload: { defense: true } };
    const newState = stateReducer(initialState, action);
    expect(newState.defense).toBe(true);
  });
});

describe("RESET", () => {
  it("should reset the state", () => {
    let newState = { ...initialState };
    newState.defense = true;
    const action = { type: "RESET", increaseMatch: false };
    newState = stateReducer(newState, action);
    expect(newState).toEqual(initialState);
  });
});

describe("NEXT_MODE", () => {
  it("should change the mode in match scout", () => {
    const initialState = {
      mode: "Configure",
      scoutingType: "match",
    };
    const action = { type: "NEXT_MODE" };
    const newState = stateReducer(initialState, action);
    expect(newState.mode).toBe("Scout");
  });
  it("should change the mode in qualitative scout", () => {
    const initialState = {
      mode: "Configure",
      scoutingType: "qualitative",
    };
    const action = { type: "NEXT_MODE" };
    const newState = stateReducer(initialState, action);
    expect(newState.mode).toBe("Qualitative");
  });
});

describe("SET_PHASE", () => {
  it("should set the phase", () => {
    const initialState = {
      phase: "auto",
    };
    const action = { type: "SET_PHASE", phase: "teleop" };
    const newState = stateReducer(initialState, action);
    expect(newState.phase).toBe("teleop");
  });
});

describe("SET_IN_QUAL", () => {
  it("should set the team in the qualitative team array", () => {
    const initialState = {
      qualitativeTeams: [{ team: 5026 }, { team: 5027 }, { team: 5028 }],
    };
    const action = {
      type: "SET_IN_QUAL",
      index: 1,
      payload: { team: 5029 },
    };
    const newState = stateReducer(initialState, action);
    expect(newState.qualitativeTeams[1].team).toBe(5029);
  });
});

describe("default", () => {
  it("should return the state", () => {
    const initialState = {
      defense: false,
    };
    const action = { type: "INVALID" };
    const newState = stateReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
