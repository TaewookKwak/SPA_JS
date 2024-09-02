import useState from "../utils/useState.js";

function PostsPage() {
  const [posts, setPosts] = useState([]);

  const bindEvents = () => {
    const $addButton = document.querySelector(".add-post");

    $addButton.addEventListener("click", () => {
      setPosts([...posts, `post${posts.length + 1}`]);
    });
  };

  return {
    element: `
      <div>
        <h1>포스트페이지</h1>
        <button class="add-post">Add</button>
        <ul>
          ${posts.map((post) => `<li>${post}</li>`).join("")}
        </ul>
      </div>
  `,
    bindEvents,
  };
}

export default PostsPage;
