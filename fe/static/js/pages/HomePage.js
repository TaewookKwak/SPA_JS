import Todos from "../components/Todos.js";
import createComponent from "../core/component.js";
import { render } from "../index.js";

let state = {
  todos: ["운동하기", "공부하기", "책읽기"],
};

function HomePage() {
  const setState = (newState) => {
    state = { ...state, ...newState };
    render();
  };

  const DailyTodosComponent = createComponent(Todos, {
    todos: state.todos,
    setTodos: setState,
  });

  const bindEvents = () => {
    DailyTodosComponent.bindEvents();
  };

  return {
    element: `
      <main>
         ${DailyTodosComponent.element}
      </main>
    `,
    bindEvents,
  };
}

export default HomePage;
