import { ToDo } from "./AppToDo.js";

const $container = document.getElementById("todo-mine");
$container.classList.add('container');

new ToDo({
  container: $container,
});


