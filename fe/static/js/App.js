import createComponent from "./core/component.js";
import HomePage from "./pages/HomePage.js";
import IntroPage from "./pages/IntroPage.js";
import NotFoundPage from "./pages/NotFoundPage.js";
import PostsPage from "./pages/PostsPage.js";

const routes = {
  "/": HomePage,
  "/posts": PostsPage,
  "/introduce": IntroPage,
};

function App() {
  const path = window.location.pathname;
  const Page = routes[path] || NotFoundPage;
  const PageComponent = createComponent(Page);

  const bindEvents = () => {
    PageComponent.bindEvents();
  };

  return {
    element: `${PageComponent.element}`,
    bindEvents,
  };
}

export default App; // 각 페이지를 불러와서 렌더링 하는 역할
