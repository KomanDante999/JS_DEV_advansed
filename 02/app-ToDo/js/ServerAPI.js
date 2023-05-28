export  class ServerAPI {
  constructor(params) {
    this.urlServer = params.urlServer;
    this.sendData = [];
    this.getData = null;
    this.id = null;
    this.key = null;
  }

  async post() {
    for (const item of this.sendData) {
      this.response = await fetch(this.urlServer, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: item.name,
          owner: this.key,
          done: item.done,
        }),
      });
      console.log('this.response :>> ', this.response);
    }
  }

  async get() {
    this.response = await fetch(this.urlServer);
    this.getData = await this.response.json();
  }

  async getId() {
    this.response = await fetch(`${this.urlServer}/${this.id}`);
    this.getData = await this.response.json();
  }

  async search() {
    this.response = await fetch(`${this.urlServer}?search=${this.searchStr}`);
    this.getData = await this.response.json();
  }

  async patch() {
    this.response = await fetch(`${this.urlServer}/${this.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.sendData[0]),
    });
    this.getData = await this.response.json();
  }

  async delete() {
    this.response = await fetch(`${this.urlServer}/${this.id}`, {
      method: "DELETE",
    });
  }

  async deleteAll() {
    for (const client of this.getData) {
      this.response = await fetch(`${this.urlServer}/${client.id}`, {
        method: "DELETE",
      });
    }
  }


  get urlServer() {
    return this._urlServer;
  }

  set urlServer(value) {
    this._urlServer = value;
  }

  get sendData() {
    return this._sendData;
  }

  set sendData(value) {
    this._sendData = value;
    console.log('this._sendData :>> ', this._sendData);
  }

  get getData() {
    return this._getData;
  }

  set getData(value) {
    this._getData = value;
    console.log('this._getData :>> ', this._getData);
  }

  get response() {
    return this._response;
  }

  set response(value) {
    this._response = value;
  }
};


