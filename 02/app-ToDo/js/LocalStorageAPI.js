export class LocalStorageAPI {

  constructor() {
    this.key= null
    this.data = []
  }

  saveData(params) {
    this.key = params.key
    this.data = params.data
    localStorage.setItem(this.key, JSON.stringify(this.data));
  }

  getData(params) {
    this.key = params.key
    this.data = JSON.parse(localStorage.getItem(this.key))
  }
}
