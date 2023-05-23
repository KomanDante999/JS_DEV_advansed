// import { Note } from "./Note.js";
// import { NoteList } from "./NoteList.js";
import { ToDo } from "./ToDo.js";

const $container = document.getElementById('app');
$container.classList.add('container');

// const $btnAddUser = document.createElement('button')
// $btnAddUser.classList.add('btn', 'btn-primary')
// $btnAddUser.textContent = 'Добавить дело'
// $btnAddUser.addEventListener('click', function() {
//   app.addUser(prompt('Имя пользователя?'), 'sad')
// })
// $container.append($btnAddUser)

new ToDo($container)


