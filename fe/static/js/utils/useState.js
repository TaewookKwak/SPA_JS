import { render } from "../index.js";

let currentStateKey = 0; // useState가 실행 된 횟수
const states = [];

function useState(initialState) {
  const key = currentStateKey;

  console.log(currentStateKey, "key");

  if (states.length === key) {
    states.push(initialState);
  }

  const state = states[key];
  const setState = (newState) => {
    // 원시타입
    if (newState === state) {
      console.log("같은값");
      return;
    }

    // 객체, 배열
    if (JSON.stringify(newState) === JSON.stringify(state)) {
      console.log("같은값");
      return;
    }
    states[key] = newState;
    console.log(states[key]);
    currentStateKey = 0;
    render();
  };

  currentStateKey += 1;
  return [state, setState];
}

export default useState;
