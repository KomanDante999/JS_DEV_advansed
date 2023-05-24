import { ListNotes } from "./ListNotes.js";

export class ToDo {
  _notes = null;
  _users = [];
  _currentUser = "todo";
  _newNoteName = "";

  constructor(params) {
    this.createLayout(params);
    this.createListNotes()


    //* events
    this.$input.addEventListener("input", () => {
      this.newNoteName = this.$input.value;
    });
    this.$form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addNewNote()
      this.newNoteName = ''
      this.$input.value = ''
    });
  }

  createLayout(params) {
    this.$box = document.createElement("div");
    this.$header = document.createElement("div");
    this.$title = document.createElement("h2");
    this.$form = document.createElement("form");
    this.$input = document.createElement("input");
    this.$btnSubmit = document.createElement("button");
    this.$containerListNotes = document.createElement("div");

    this.$header.classList.add(
      "d-flex",
      "justify-content-between",
      "align-item-center",
      "border",
      "border-primary",
      "p-2",
      "mb-2",
      "rounded-1"
    );
    this.$box.classList.add("d-flex", "flex-column");
    this.$form.classList.add("input-group", "mb-3");
    this.$input.classList.add("form-control");
    this.$btnSubmit.classList.add("btn", "btn-primary");
    this.$btnSubmit.disabled = true;

    this.$title.textContent = "Список дел";
    this.$input.placeholder = "Введите название нового дела";
    this.$btnSubmit.textContent = "Добавить дело";

    this.$header.append(this.$title);
    this.$form.append(this.$input, this.$btnSubmit);
    this.$box.append(this.$header, this.$form, this.$containerListNotes);

    if ("container" in params) {
      this.$container = params.container;
      this.$container.append(this.$box);
    }
  }

  createListNotes() {
    this.listNotes = new ListNotes()
    this.$containerListNotes.append(this.listNotes.$listItems);
  }

  addNewNote() {
    this.listNotes.addItem({
      name: this.newNoteName,
    });
  }

  get newNoteName() {
    return this._newNoteName;
  }
  set newNoteName(value) {
    this._newNoteName = value.trim();
    if (this._newNoteName) {
      this.$btnSubmit.disabled = false;
    }
  }
}


