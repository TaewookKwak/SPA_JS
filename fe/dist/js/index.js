function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function createElement(type, props) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }
  return {
    type: type,
    props: _objectSpread(_objectSpread({}, props), {}, {
      children: children.map(function (child) {
        return _typeof(child) === "object" ? child : createTextElement(child);
      })
    })
  };
}

// 숫자, 문자열일 경우 텍스트 엘리먼트로 변환
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      // nodeValue vs textContent vs innerText vs innerHTML
      children: []
    }
  };
}
function render(element, container) {
  var dom = element.type === "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(element.type);
  var isPeroperty = function isPeroperty(key) {
    return key !== "children";
  }; // children을 제외한 속성만 필터링
  Object.keys(element.props).filter(isPeroperty).forEach(function (name) {
    dom[name] = element.props[name];
  }); // dom에 속성 추가

  element.props.children.forEach(function (child) {
    return render(child, dom);
  });
  container.appendChild(dom); // append vs appendChild
}
var JSact = {
  createElement: createElement,
  render: render
};

/** @jsx JSact.createElement */
var element = JSact.createElement("div", {
  style: "background: salmon"
}, JSact.createElement("h1", null, "Hello World"), JSact.createElement("h2", {
  style: "text-align:right"
}, "from JSact"));
var container = document.getElementById("app");
JSact.render(element, container);

// export const render = () => {
//   const app = document.getElementById("app");
//   const AppComponent = createComponent(App);

//   app.innerHTML = AppComponent.element;

//   AppComponent.bindEvents(); // 렌더링 후 이벤트가 실행될 수 있기 때문에
// };

// 브라우저 히스토리 관리
export var navigateTo = function navigateTo(url) {
  history.pushState(null, null, url); // pushState(상태객체, 제목, URL)
  render();
};

// 뒤로가기, 앞으로가기
window.addEventListener("popstate", render);

// 페이지 로드
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM 로드 완료");
  document.body.addEventListener("click", function (e) {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  }); // 페이지 이동

  render(); // 초기 페이지 로드
});