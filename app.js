let todos = [];
let filterValue = "all";

//selecting:

const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todolist");
const selectFilter = document.querySelector(".todo-filter");

//events:

todoForm.addEventListener("submit", addNewTodo);
selectFilter.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodos();
});

//functions:

function addNewTodo(e) {
  e.preventDefault();

  if (!todoInput.value) return null;

  const newTodo = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    title: todoInput.value,
    isCompleted: false,
  };

  todos.push(newTodo);
  filterTodos();
}

function createTodos(todos){
  //create todos on dom
  result = "";

  todos.forEach((todo) => {
    
    result += `<li class="todo">
              <p class="todo__title">${todo.title}</p>
              <span class="todo__createdAt">${new Date(todo.createdAt).toLocaleDateString("fa-IR")}</span>
              <button data-todo-id=${todo.id} class="todo__check">
                <i class="fa-regular fa-circle-check"></i>
              </button>
              <button data-todo-id=${todo.id} class="todo__remove">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </li>`;
  });

  todoList.innerHTML = result;
  todoInput.value ="";
}

function filterTodos(e) {
  switch (filterValue) {
    case "all": {
      createTodos(todos);
      break;
    }
    case "completed": {
      const filteredTodos = todos.filter((t) => t.isCompleted);
      createTodos(filteredTodos);
      break;
    }
    case "incompleted": {
      const filteredTodos = todos.filter((t) => !t.isCompleted);
      createTodos(filteredTodos);
      break;
    }
    default:
      createTodos(todos);
  }
}