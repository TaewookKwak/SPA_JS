function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function Todos(_ref) {
  var todos = _ref.todos,
    setTodos = _ref.setTodos;
  var handleClickAddButton = function handleClickAddButton() {
    console.log("click");
    setTodos([].concat(_toConsumableArray(todos), ["item".concat(todos.length + 1)]));
  };
  var bindEvents = function bindEvents() {
    var $addButton = document.querySelector(".add-todo");
    $addButton.addEventListener("click", handleClickAddButton);
  };
  return {
    element: "\n        <ul>\n            ".concat(todos.map(function (todo) {
      return "<li>".concat(todo, "</li>");
    }).join(""), "\n        </ul>\n        <button class=\"add-todo\">Add</button>\n    "),
    bindEvents: bindEvents
  };
}
export default Todos;