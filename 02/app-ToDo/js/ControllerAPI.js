import { LocalStorageAPI } from "./LocalStorageAPI.js";
import { ServerAPI } from "./ServerAPI.js";

export class ControllerAPI {
  _currentHostAPI = null;
  __getData = []

  constructor(params) {
    this.currentHostAPI = params.currentHostAPI;
    this.selectorAPI = params.selectorAPI;
    this.selectorAPIName = this.selectorAPIName;
    this.getData = [];

    //* events
    this.selectorAPI.addEventListener("click", () => {
      if (this.currentHostAPI === "local") {
        this.currentHostAPI = "server";
      } else {
        this.currentHostAPI = "local";
      }
    });

  }

  getDatafromHost(params) {
    switch (this.currentHostAPI) {
      case "local":
        this.hostAPI.getData({
          key: params.key,
        });
        this.getData = this.hostAPI.data;
        break;
      case "server":
        break;
    }
  }

  saveDataToHost(params) {
    switch (this.currentHostAPI) {
      case "local":
        this.hostAPI.saveData({
          key: params.key,
          data: params.data,
        });
        break;
      case "server":
        this.hostAPI.sendData = params.data;
        this.hostAPI.key = params.key;
        setTimeout(async () => {
          await this.hostAPI.post();
        }, 0);
        break;
    }
  }

  selectorAPIText(params) {
    if (this.selectorAPI) {
      this.selectorAPI.textContent = params;
    }
  }

  get currentHostAPI() {
    return this._currentHostAPI;
  }
  set currentHostAPI(value) {
    this._currentHostAPI = value;

    switch (value) {
      case "local":
        this.hostAPI = new LocalStorageAPI();
        this.selectorAPIName = "Перейти на серверное хранилище";
        break;
      case "server":
        this.hostAPI = new ServerAPI({
          urlServer: "http://localhost:3000/api/todos",
        });
        this.selectorAPIName = "Перейти на локальное хранилище";
        break;
    }

  }

  get selectorAPIName() {
    return this._selectorAPIName;
  }
  set selectorAPIName(value) {
    this._selectorAPIName = value;

    if (this.selectorAPI) {
      this.selectorAPI.textContent = this.selectorAPIName;
    }
  }

  get getData() {
    return this._getData;
  }
  set getData(value) {
    this._getData = value;
  }
}
