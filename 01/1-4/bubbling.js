['body', 'top', 'list', 'item1', 'item2', 'item3', 'html'].forEach(idd => {
  const elem = document.getElementById(idd);

  elem.addEventListener('click', eve => {
    console.log('Погружение...  ', idd);
    console.log('target =  ', eve.target);
    console.log('currentTarget = ', eve.currentTarget);// === this
    // eve.stopPropagation();
  }, {capture: true});

  elem.addEventListener('click', eve => {
    console.log('Всплытие...  ', idd);
    eve.stopPropagation();
  }, {capture: false});
})
