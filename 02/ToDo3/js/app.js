// import { Note } from "./Note.js";
// import { NoteList } from "./NoteList.js";
import { ToDo } from "./ToDo.js";

const $container = document.getElementById('app');
$container.classList.add('container');

const $btnAddUser = document.createElement('button')
$btnAddUser.classList.add('btn', 'btn-primary')
$btnAddUser.textContent = 'Добавить дело'
$btnAddUser.addEventListener('click', function() {
  app.addUser(prompt('Имя пользователя?'), 'sad')
})
$container.append($btnAddUser)


let defList = [
  {name: 'Запланированное дело 1'},
  {name: 'Запланированное дело 2'},
  {name: 'Запланированное дело 3'},
  {name: 'Запланированное дело 4'},
]

let app = new ToDo($container)
app.addUser('Понедельник', 'mon', defList)
app.addUser('Вторник', 'tues', defList)
app.addUser('Среда', 'wed', defList)
app.addUser('Четверг', 'thu', defList)
app.addUser('Пятница', 'fri', defList)
app.addUser('Суббота', 'sat', defList)
app.addUser('Воскресенье', 'sun', defList)



