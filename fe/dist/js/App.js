import createComponent from "./core/component.js";
import HomePage from "./pages/HomePage.js";
import IntroPage from "./pages/IntroPage.js";
import NotFoundPage from "./pages/NotFoundPage.js";
import PostsPage from "./pages/PostsPage.js";
var routes = {
  "/": HomePage,
  "/posts": PostsPage,
  "/introduce": IntroPage
};
function App() {
  var path = window.location.pathname;
  var Page = routes[path] || NotFoundPage;
  var PageComponent = createComponent(Page);
  var bindEvents = function bindEvents() {
    if (PageComponent.bindEvents) PageComponent.bindEvents();
  };
  return {
    element: "".concat(PageComponent.element),
    bindEvents: bindEvents
  };
}
export default App; // 각 페이지를 불러와서 렌더링 하는 역할