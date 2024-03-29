import { ListNotes } from "./ListNotes.js";
import { ControllerAPI } from "./ControllerAPI.js";

export class ToDo {
  // _notes = null;
  // _users = [];
  // _currentUser = "todo";
  // _newNoteName = "";
  _defaultHostAPI = "local";

  constructor(params) {
    this.currentOwner = "my";
    this.createLayout(params);
    if ("defaultHostAPI" in params) this.defaultHostAPI = params.defaultHostAPI;
    else this.defaultHostAPI = this._defaultHostAPI;
    this.controllerAPI = new ControllerAPI({
      currentHostAPI: this.defaultHostAPI,
      selectorAPI: this.$btnAPISelect,
    });

    this.createListNotes();

    //* events
    this.$input.addEventListener("input", () => {
      this.newNoteName = this.$input.value;
    });

    this.$form.addEventListener("submit", (e) => {
      e.preventDefault()
      this.addNewNote()
      this.addEventsToItems()
      this.saveDataToHost()
      this.newNoteName = "";
      this.$input.value = "";
    });
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
      owner: this.currentOwner,
      // hostAPI: this.controllerAPI,
    });
    this.$containerListNotes.append(this.listNotes.$listItems)
    this.getDatafromHost();
    this.listNotes.arrayData = this.controllerAPI.getData
    this.listNotes.createListNotes();
    this.addEventsToItems()
  }

  getDatafromHost() {
    this.controllerAPI.getDatafromHost({
      key: this.currentOwner
    });
  }

  saveDataToHost() {
    this.controllerAPI.saveDataToHost({
      key: this.currentOwner,
      data: this.listNotes.arrayData,
    });
  }

  addNewNote() {
    this.listNotes.addItem({
      name: this.newNoteName,
      done: false,
    });

  }

  addEventsToItems() {
    for (const item of this.listNotes.arrayItems) {
      //* event remove
      item.$deleteBatton.addEventListener("click", () => {
        this.saveDataToHost()
      });
      //* event done change
      item.$doneButton.addEventListener("click", () => {
        this.saveDataToHost();
      });
    }
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


