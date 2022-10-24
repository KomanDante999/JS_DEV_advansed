(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('body');
    container.classList.add('container');

    const dragDiv = document.createElement('div');
    dragDiv.classList.add('drag-element');
    dragDiv.style.left = 0;
    dragDiv.style.top = 0;

    dragDiv.textContent = 'Drag me!!!'
    container.append(dragDiv);

    let x, y, left, top;

    function onMove(event) {
      event.preventDefault();
      dragDiv.style.left = event.clientX - x + left;
      dragDiv.style.top = event.clientY - y + top;
    }

    // нажатие на элемент
    dragDiv.addEventListener('mousedown', event => {
      x = event.clientX;
      console.log('clientX', x);
      y = event.clientY;
      console.log('clientY', y);

      left = parseInt(dragDiv.style.left);
      top = parseInt(dragDiv.style.top);
      console.log('left', left);
      console.log('top', top);
      window.addEventListener('mousemove', onMove);
    })




  })
}) ()
