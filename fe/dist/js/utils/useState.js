import { render } from "../index.js";
var currentStateKey = 0; // useState가 실행 된 횟수
var states = [];
function useState(initialState) {
  var key = currentStateKey;
  console.log(currentStateKey, "key");
  if (states.length === key) {
    states.push(initialState);
  }
  var state = states[key];
  var setState = function setState(newState) {
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