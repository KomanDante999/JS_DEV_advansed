class ScrollPage {
  _windowY = 0;
  constructor() {
    this.$btnScrollUp = document.createElement("button");
    this.$btnScrollUp.classList.add(
      "btnstyle",
      "button-scroll",
      "display-none"
    );
    this.$btnScrollUp.textContent = "Прокрутить вверх";
    this.$btnScrollUp.style.position = "fixed";
    this.$btnScrollUp.style.left = "20px";
    this.$btnScrollUp.style.bottom = "20px";
    document.body.append(this.$btnScrollUp);

    //* events

    this.$btnScrollUp.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener(
      "scroll",
      () => {
        this.windowY = window.pageYOffset;
      },
      { passive: true }
    );
  }

  get windowY() {
    return this._windowY;
  }

  set windowY(value) {
    this._windowY = value;

    if (this._windowY >= 100) {
      this.$btnScrollUp.classList.remove("display-none");
    } else {
      this.$btnScrollUp.classList.add("display-none");
    }
    console.log("this._windowY :>> ", this._windowY);
  }

}

new ScrollPage()
