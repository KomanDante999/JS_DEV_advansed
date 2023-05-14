(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const dragDiv = document.getElementById("drag-element");
    let x, y, left, top;

    function onMove(event) {
      console.log('start move');
      event.preventDefault();
      dragDiv.style.left = event.clientX - x + left;
      dragDiv.style.top = event.clientY - y + top;
    }

    // нажатие на элемент
    dragDiv.addEventListener("mousedown", (event) => {
      x = event.clientX;
      console.log("clientX", x);
      y = event.clientY;
      console.log("clientY", y);

      left = parseInt(dragDiv.style.left);
      top = parseInt(dragDiv.style.top);
      console.log("left", left);
      console.log("top", top);
      window.addEventListener("mousemove", onMove);
    });
    // отжатие кнопки мыши
    document.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", onMove);
    });



  });
}) ();
