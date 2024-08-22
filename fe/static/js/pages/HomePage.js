import Layout from "./Layout.js";

export default class extends Layout {
  constructor() {
    super();
    this.setTitle("홈");
  }

  async getHtml() {
    return `
    <h1 class="title">홈페이지입니다</h1>
    <p class="sub_title">안녕하세요. 홈페이지입니다.</p>
    <a class="link_button" href="/posts" data-link>포스트로 이동</a>
    `;
  }
}
