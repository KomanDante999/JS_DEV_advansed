import { ListNotes } from "./ListNotes.js";
import { LocalStorageAPI } from "./LocalStorageAPI.js";
import { ServerAPI } from "./ServerAPI.js";

export class ToDo {
  // _notes = null;
  // _users = [];
  // _currentUser = "todo";
  // _newNoteName = "";
  _currentHostAPI = "local";

  constructor(params) {
    this.currentId = 1;
    this.createLayout(params);
    this.currentHostAPI = this._currentHostAPI;
    this.createListNotes();

    //* events
    this.$input.addEventListener("input", () => {
      this.newNoteName = this.$input.value;
    })

    this.$form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addNewNote();
      this.newNoteName = "";
      this.$input.value = "";
    })

    this.$btnAPISelect.addEventListener('click', () => {
      if (this.currentHostAPI === 'local') this.currentHostAPI = "server"
      else this.currentHostAPI = 'local'
    })
  }

  createLayout(params) {
    this.$box = document.createElement("div");
    this.$header = document.createElement("div");
    this.$title = document.createElement("h2");
    this.$btnAPISelect = document.createElement("button");
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
    this.$btnAPISelect.classList.add("btn", "btn-outline-primary");
    this.$btnSubmit.classList.add("btn", "btn-primary");
    this.$btnSubmit.disabled = true;

    this.$title.textContent = "Список дел";
    this.$input.placeholder = "Введите название нового дела";
    this.$btnSubmit.textContent = "Добавить дело";

    this.$header.append(this.$title, this.$btnAPISelect);
    this.$form.append(this.$input, this.$btnSubmit);
    this.$box.append(this.$header, this.$form, this.$containerListNotes);

    if ("container" in params) {
      this.$container = params.container;
      this.$container.append(this.$box);
    }
  }

  createListNotes() {
    this.listNotes = new ListNotes({
      id: this.currentId,
      hostAPI: this.hostAPI,
    });
    this.$containerListNotes.append(this.listNotes.$listItems);
  }

  addNewNote() {
    this.listNotes.addItem({
      name: this.newNoteName,
      done: false,
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

  get currentHostAPI() {
    return this._currentHostAPI;
  }
  set currentHostAPI(value) {
    this._currentHostAPI = value

    switch (value) {
      case "local":
        this.hostAPI = new LocalStorageAPI()
        this.currentBtnAPIName = "Перейти на серверное хранилище";
        break;
      case "server":
        this.hostAPI = new ServerAPI();
        this.currentBtnAPIName = "Перейти на локальное хранилище";
        break;

        default:
          this.hostAPI = new LocalStorageAPI();
          this.currentBtnAPIName = "Перейти на серверное хранилище";
          break;
        }
      }

  get currentBtnAPIName() {
    return this._currentBtnAPIName;
  }
  set currentBtnAPIName(value) {
    this._currentBtnAPIName = value

    if (this.$btnAPISelect) {
      this.$btnAPISelect.textContent = this.currentBtnAPIName
    }
  }
}


