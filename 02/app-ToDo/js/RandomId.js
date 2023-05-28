export class GetRandomId {
  _lenght = 5;
  _prefix = "";
  _postfix = "";

  constructor(options = {}) {
    this.length = this._length;
    this.prefix = this._prefix;
    this.postfix = this._postfix;
    if ("length" in options) this.length = options.length;
    if ("prefix" in options) this.prefix = options.prefix;
    if ("postfix" in options) this.postfix = options.postfix;

    this.myArray = new Uint32Array(1);
    crypto.getRandomValues(this.myArray);
    this.id = String(this.myArray[0]).slice(0, this.length);

    this.idStr = this.prefix + this.id + this.postfix;
    this.idNum = Number(this.id);
  }
}
