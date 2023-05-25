export class ServerAPI {
  constructor() {
    this.key = null;
    this.data = [];
  }

  saveData(params) {
    this.key = params.key;
    this.data = params.data;

  }

  getData(params) {
    this.key = params.key;
    // this.data = JSON.parse(localStorage.getItem(this.key));
  }
}
