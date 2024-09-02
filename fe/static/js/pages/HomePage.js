import Todos from "../components/Todos.js";
import createComponent from "../core/component.js";
import useState from "../utils/useState.js";

function HomePage() {
  const [todos, setTodos] = useState(["운동하기", "공부하기", "책읽기"]);
  const [number, setNumber] = useState(0);

  const DailyTodosComponent = createComponent(Todos, {
    todos: todos,
    setTodos: setTodos,
  });

  const bindEvents = () => {
    DailyTodosComponent.bindEvents();

    const $increaseButton = document.querySelector(".increase_number");
    $increaseButton.addEventListener("click", () => {
      setNumber(number + 1);
    });
  };

  return {
    element: `
      <main>
         ${DailyTodosComponent.element}
          <h2>${number}</h2>
          <button class="increase_number">Increase</button>
      </main>
    `,
    bindEvents,
  };
}

export default HomePage;
