import HomePage from "./pages/HomePage.js";
import IntroPage from "./pages/IntroPage.js";
import NotFoundPage from "./pages/NotFoundPage.js";
import PostsPage from "./pages/PostsPage.js";

// 브라우저 히스토리 관리
const navigateTo = (url) => {
  history.pushState(null, null, url); // pushState(상태객체, 제목, URL)
  loadPage();
};

const loadPage = async () => {
  const routes = [
    { path: "/", page: HomePage },
    { path: "/posts", page: PostsPage },
    { path: "/introduce", page: IntroPage },
  ];

  const potentialMathches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  let matche = potentialMathches?.find(
    (potentialMatch) => potentialMatch.isMatch
  );

  if (!matche) {
    matche = {
      route: { path: "/404", page: NotFoundPage },
      isMatch: false,
    };
  }

  const page = new matche.route.page();

  document.querySelector("#app").innerHTML = await page.getHtml();
};

// 뒤로가기, 앞으로가기
window.addEventListener("popstate", loadPage);

// 페이지 로드
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    console.log(e.target.matches("[data-link]"));
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  }); // 페이지 이동

  loadPage(); // 초기 페이지 로드
});
