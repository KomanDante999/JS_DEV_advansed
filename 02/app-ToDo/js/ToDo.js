import { NoteList } from "./NoteList.js"

export class ToDo {
  _notes = null;
  _users = [];
  _currentUser = "todo";

  constructor(params) {}

  createLayout(params) {

    this.nav = document.createElement("nav");
    this.title = document.createElement("h2");
    this.form = document.createElement("form");
    this.input = document.createElement("input");
    this.buttonWrap = document.createElement("div");
    this.button = document.createElement("button");
    this.list = document.createElement("div");

    this.container.classList.add("py-5");
    this.nav.classList.add("mb-5", "btn-group");
    this.form.classList.add("input-group", "mb-3");
    this.input.classList.add("form-control");
    this.input.placeholder = "Введите название нового дела";
    this.buttonWrap.classList.add("input-group-append");
    this.button.classList.add("btn", "btn-primary");
    this.button.textContent = "Добавить дело";
    this.button.disabled = true;

    this.buttonWrap.append(this.button);
    this.form.append(this.input, this.buttonWrap);
    this.container.append(this.nav, this.title, this.form, this.list);

  }
}


