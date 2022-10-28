(() => {
  let OptionsName = [
    {
      index: 1,
      name: 'Телефон',
      value: 'tel',
      selected: true,
    },
    {
      index: 2,
      name: 'Доп. телефон',
      value: 'tel-extens',
      selected: false,
    },
    {
      index: 3,
      name: 'Email',
      value: 'email',
      selected: false,
    },
    {
      index: 4,
      name: 'Vk',
      value: 'vk',
      selected: false,
    },
    {
      index: 5,
      name: 'Facebook',
      value: 'facebook',
      selected: false,
    },
  ]

  const arrowDown =
  `<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.494999 0.69C0.249999 0.935 0.249999 1.33 0.494999 1.575L4.65 5.73C4.845 5.925 5.16 5.925 5.355 5.73L9.51 1.575C9.755 1.33 9.755 0.935 9.51 0.69C9.265 0.445 8.87 0.445 8.625 0.69L5 4.31L1.375 0.685001C1.135 0.445001 0.734999 0.445 0.494999 0.69Z" fill="currentColor"/>
  </svg>`


  function createSelect(OptionsName, classSelect) {
    const selectValue = {value:''}

    const select = document.createElement('div');
    select.classList.add(`${classSelect}`);

    // head
    const head = document.createElement('button');
    const caption = document.createElement('span');
    const arrow = document.createElement('span');

    head.classList.add(`${classSelect}-head`);
    caption.classList.add(`${classSelect}-head--caption`);
    arrow.classList.add(`${classSelect}-head--arrow`);
    arrow.innerHTML = arrowDown;

    for (const option of OptionsName) {
      if (option.selected === true) {
        head.value = option.value;
        caption.textContent = option.name;
        selectValue.value = option.value;
      }
    }

    head.append(caption, arrow)

    // dropdown list
    const dropdownContainer = document.createElement('div');
    const list = document.createElement('ul');
    dropdownContainer.classList.add(`${classSelect}-dropdown`)
    list.classList.add(`${classSelect}-dropdown--list`)

    for (const option of OptionsName) {
      const item = document.createElement('li');
      const button = document.createElement('button');
      const caption = document.createElement('span');

      item.classList.add(`${classSelect}-dropdown--item`);
      button.classList.add(`${classSelect}-dropdown--button`);
      caption.classList.add(`${classSelect}-dropdown--caption`);

      if (option.selected === true) {
        item.classList.add('is-selected');
      }

      button.value = option.index;
      caption.textContent = option.name;


      button.append(caption);
      item.append(button);
      list.append(item);
    }
    dropdownContainer.append(list);

    select.append(head, dropdownContainer);
    return {select, selectValue}
  }




  const select = createSelect(OptionsName, 'kd-choice');
  const container = document.getElementById('kd-choice-0');
  container.append(select.select);
}) ();
