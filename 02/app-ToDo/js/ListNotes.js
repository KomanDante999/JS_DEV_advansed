import { Note } from "./Note.js";

export class ListNotes {
  constructor(params) {
    this.id = params.id;
    this.hostAPI = params.hostAPI;
    this.arrayItems = [];
    this.arrayData = [];
    this.createLayout();
    this.getDataFromHost();
    this.createListNotes()
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
    });
    this.arrayItems.push(this.item);
    this.$listItems.append(this.item.$item);
    this.arrayDataUpdate();
    this.saveDataToHost();

    //* event remove
    this.item.$deleteBatton.addEventListener("click", () => {
      this.arrayItems.splice(
        this.arrayItems.findIndex((item) => item.delete),
        1
      );
      this.arrayDataUpdate();
      this.saveDataToHost();
    });

    //* event done change
    this.item.$doneButton.addEventListener("click", () => {
      this.arrayDataUpdate();
      this.saveDataToHost();
    });
  }

  arrayDataUpdate() {
    this.arrayData = [];
    for (const item of this.arrayItems) {
      this.arrayData.push({
        name: item.name,
        done: item.done,
      });
    }
  }

  getDataFromHost() {
    this.hostAPI.getData({
      key: this.id,
    });

    this.arrayData = this.hostAPI.data;
    //!----------------------------------------
    console.log("this.arrayData :>> ", this.arrayData);
  }

  createListNotes() {
    if (this.arrayData) {
      for (const item of this.arrayData) {
        this.addItem({
          name: item.name,
          done: item.done,
        })
      }

    }
  }

  saveDataToHost() {
    this.hostAPI.saveData({
      key: this.id,
      data: this.arrayData,
    });
  }
};
