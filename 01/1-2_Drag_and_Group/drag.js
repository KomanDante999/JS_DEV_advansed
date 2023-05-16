(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const dragDiv = document.getElementById("drag-element");

    function moveAt(e) {
      dragDiv.style.left = e.pageX - dragDiv.offsetWidth /2 + 'px'
      dragDiv.style.top = e.pageY - dragDiv.offsetHeight /2 + 'px'
    }

    dragDiv.addEventListener('dragstart', (e) => {
      e.preventDefault()
    })

    dragDiv.addEventListener("mousedown", (e) => {
      e.preventDefault()
      moveAt(e);
      document.addEventListener("mousemove", moveAt);
    });

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", moveAt);
    });



  });
}) ();
