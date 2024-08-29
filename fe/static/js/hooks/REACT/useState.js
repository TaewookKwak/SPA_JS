let state;
let setStateCallback;

function useState(initialValue) {
  if (state === undefined) {
    state = initialValue;
  }

  const setValue = (newValue) => {
    state = newValue; // 상태 업데이트

    if (setStateCallback) {
      setStateCallback();
    }
  };

  return [state, setValue];
}

function setRenderCallback(callback) {
  setStateCallback = callback;
}

// 내보내기
export { useState, setRenderCallback };
