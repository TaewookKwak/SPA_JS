import App from "./App.js";
import createComponent from "./core/component.js";

export const render = () => {
  const app = document.getElementById("app");
  const AppComponent = createComponent(App);

  app.innerHTML = AppComponent.element;

  AppComponent.bindEvents(); // 렌더링 후 이벤트가 실행될 수 있기 때문에
};

// 브라우저 히스토리 관리
export const navigateTo = (url) => {
  history.pushState(null, null, url); // pushState(상태객체, 제목, URL)
  render();
};

// 뒤로가기, 앞으로가기
window.addEventListener("popstate", render);

// 페이지 로드
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM 로드 완료");
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  }); // 페이지 이동

  render(); // 초기 페이지 로드
});
