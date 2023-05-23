import { Note } from "./Note.js";

export class NoteList {

  constructor() {
    this.createLayout()
    this.arrayItems = []
  }

  createLayout() {
    this.$listItems = document.createElement('div')
    this.$listItems.classList.add("list-group");
  }

  addItem(params) {
    this.item = new Note({
      name: params.name,
    });
    this.arrayItems.push(this.item)
    this.$listItems.append(this.item.$item)
  }
};
