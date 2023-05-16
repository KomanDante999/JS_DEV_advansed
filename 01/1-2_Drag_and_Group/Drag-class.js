class Drag {
  constructor(params) {
    this.$dragDiv = document.getElementById(`${params.id}`);

    this.$dragDiv.addEventListener("mousedown", (e) => {
      this.moveAt(e)
    });


  }
  moveAt(e) {
    this.$dragDiv.style.left = e.pageX - this.$dragDiv.offsetWidth / 2 + "px";
    this.$dragDiv.style.top = e.pageY - this.$dragDiv.offsetHeight / 2 + "px";
  }
}

new Drag({
  id: "drag-element",
});
