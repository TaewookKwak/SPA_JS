import Layout from "./Layout.js";

export default class extends Layout {
  constructor() {
    super();
    this.setTitle("404");
  }

  async getHtml() {
    return `
    <h1 class="title">404페이지입니다</h1>
    <p class="sub_title">안녕하세요. 404페이지입니다.</p>
    <a class="link_button" href="/" data-link>홈으로 이동</a>
    `;
  }
}
