import { Note } from "./Note.js";
import { GetRandomId } from "./RandomId.js";

export class ListNotes {
  constructor(params) {
    this.owner = params.owner;
    this.hostAPI = params.hostAPI;
    this.arrayItems = [];
    this.arrayData = [];
    this.createLayout();
  }

  createLayout() {
    this.$listItems = document.createElement("div");
    this.$listItems.classList.add("list-group");
  }

  addItem(params) {
    //* event add
    this.item = new Note({
      name: params.name,
      done: params.done,
      id: new GetRandomId().idNum,
    });
    this.arrayItems.push(this.item);
    this.$listItems.append(this.item.$item);
    this.arrayDataUpdate();

    //* event remove
    this.item.$deleteBatton.addEventListener("click", () => {
      this.arrayItems.splice(
        this.arrayItems.findIndex((item) => item.delete),
        1
      );
      this.arrayDataUpdate();
    });

    //* event done change
    this.item.$doneButton.addEventListener("click", () => {
      this.arrayDataUpdate();
    });
  }

  arrayDataUpdate() {
    this.arrayData = [];
    for (const item of this.arrayItems) {
      this.arrayData.push({
        name: item.name,
        done: item.done,
        id: item.id,
      });
    }
  }

  createListNotes() {
    if (this.arrayData) {
      for (const item of this.arrayData) {
        this.addItem({
          name: item.name,
          done: item.done,
          id: item.id,
        });
      }
    }
  }
};
