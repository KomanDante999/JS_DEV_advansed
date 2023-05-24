import { Note } from "./Note.js";

export class ListNotes {

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

    this.item.$deleteBatton.addEventListener('click', () => {
      this.arrayItems.splice(this.arrayItems.findIndex(item => item.delete), 1)
    })
  }
};
