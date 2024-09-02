function Todos({ todos, setTodos }) {
  const handleClickAddButton = () => {
    console.log("click");
    setTodos([...todos, `item${todos.length + 1}`]);
  };

  const bindEvents = () => {
    const $addButton = document.querySelector(".add-todo");

    $addButton.addEventListener("click", handleClickAddButton);
  };

  return {
    element: `
        <ul>
            ${todos.map((todo) => `<li>${todo}</li>`).join("")}
        </ul>
        <button class="add-todo">Add</button>
    `,
    bindEvents,
  };
}
export default Todos;
