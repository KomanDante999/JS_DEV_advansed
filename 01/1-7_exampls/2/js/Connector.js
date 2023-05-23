export class Connector {

  constructor(params) {
    if ("container" in params) {
      this.$container = params.container;
    } else {
      this.$container = document.body;
    }

  }

  runCreateClient(params) {
    this.data = params.sendData;
    this.$boxData = document.createElement('div')
    this.$boxData.textContent = this.data.surname + ' ' + this.data.name + ' ' + this.data.lastName

    console.log('this.data :>> ', this.data);

    this.$container.append(this.$boxData)
  }
}
