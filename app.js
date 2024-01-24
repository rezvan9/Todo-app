// let todos = [];
let filterValue = "all";

//selecting:

const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todolist");
const selectFilter = document.querySelector(".todo-filter");
const closeBtn = document.querySelector(".close-btn");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const editInput = document.querySelector(".edit-input");
const editForm = document.querySelector(".edit-form");

//events:

todoForm.addEventListener("submit", addNewTodo);
selectFilter.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodos();
});

document.addEventListener("DOMContentLoaded", (e) => {
  const todos = getAllTodos();
  createTodos(todos);
});

closeBtn.addEventListener("click", (e) => {
  addClass();
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

  // todos.push(newTodo);
  saveTodo(newTodo);
  filterTodos();
}

function createTodos(todos) {
  //create todos on dom
  let result = "";

  todos.forEach((todo) => {
    result += `<li class="todo">
              <p class="todo__title ${todo.isCompleted && "completed"}">${
      todo.title
    }</p>
              <span class="todo__createdAt">${new Date(
                todo.createdAt
              ).toLocaleDateString("fa-IR")}</span>
              <button data-todo-id=${todo.id} class="todo__edit">
              <i class="fa-solid fa-pen"></i>
            </button>
              <button data-todo-id=${todo.id} class="todo__check">
                <i class="fa-regular fa-circle-check"></i>
              </button>
              <button data-todo-id=${todo.id} class="todo__remove">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </li>`;
  });

  todoList.innerHTML = result;
  todoInput.value = "";

  const removeBtns = [...document.querySelectorAll(".todo__remove")];
  removeBtns.forEach((btn) => btn.addEventListener("click", removeTodo));

  const checkBtns = [...document.querySelectorAll(".todo__check")];
  checkBtns.forEach((btn) => btn.addEventListener("click", checkTodo));

  const editBtns = [...document.querySelectorAll(".todo__edit")];
  editBtns.forEach((btn) => btn.addEventListener("click", editTodo));
}

function filterTodos() {
  const todos = getAllTodos();

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

function removeTodo(e) {
  // console.log(e.target.dataset.todoId);
  let todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  todos = todos.filter((t) => t.id !== todoId);
  saveAllTodos(todos);
  filterTodos();
}

function checkTodo(e) {
  const todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((t) => t.id === todoId);
  todo.isCompleted = !todo.isCompleted;
  saveAllTodos(todos);
  filterTodos();
}

function editTodo(e) {
  removeClass();
  const todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((t) => t.id === todoId);
  editInput.value = todo.title;

  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    todo.title = editInput.value;
    saveAllTodos(todos);
    filterTodos();
    addClass();
  });
}

function addClass() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

function removeClass() {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
}

//localStorage

function getAllTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  return savedTodos;
}

function saveTodo(todo) {
  const savedTodos = getAllTodos();
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
  return savedTodos;
}

function saveAllTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
