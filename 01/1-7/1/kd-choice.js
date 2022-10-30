(() => {
  let optionsName = [
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


  function createSelect(optionsName, classSelect) {

    const select = document.createElement('form');
    select.classList.add(`${classSelect}`);

    // head
    const formValue = document.createElement('button');
    const captionHead = document.createElement('span');
    const arrow = document.createElement('span');

    formValue.type = 'button';
    formValue.classList.add(`${classSelect}-head`);
    captionHead.classList.add(`${classSelect}-head--caption`);
    arrow.classList.add(`${classSelect}-head--arrow`);
    arrow.innerHTML = arrowDown;

    for (const objOption of optionsName) {
      if (objOption.selected === true) {
        formValue.value = objOption.value;
        captionHead.textContent = objOption.name;
      }
    }

    formValue.addEventListener('click', () => {
      arrow.classList.toggle('is-open');
      dropdownContainer.classList.toggle('is-open')
      dropdownContainer.classList.toggle('is-close')
    })

    formValue.append(captionHead, arrow);

    // dropdown list
    const dropdownContainer = document.createElement('div');
    const list = document.createElement('ul');
    dropdownContainer.classList.add(`${classSelect}-dropdown`, 'is-close', 'display-none')
    list.classList.add(`${classSelect}-dropdown--list`)

    for (const objOption of optionsName) {
      const item = document.createElement('li');
      const option = document.createElement('button');
      const caption = document.createElement('span');

      item.classList.add(`${classSelect}-dropdown--item`);
      option.classList.add(`${classSelect}-dropdown--option`);
      caption.classList.add(`${classSelect}-dropdown--caption`);

      if (objOption.selected === true) {
        item.classList.add('is-selected');
      }

      caption.textContent = objOption.name;

      option.addEventListener('click', () => {
        arrow.classList.remove('is-open');
        dropdownContainer.classList.remove('is-open');
        dropdownContainer.classList.add('is-close');

        formValue.value = objOption.value;
        captionHead.textContent = objOption.name;

        const listItems = list.childNodes
        for (const item of listItems) {
          item.classList.remove('is-selected')
        }

        item.classList.add('is-selected')
      })

      option.append(caption);
      item.append(option);
      list.append(item);
    }
    dropdownContainer.append(list);

    dropdownContainer.addEventListener('animationend', () => {
      dropdownContainer.classList.toggle('display-none')
    })

    select.append(formValue, dropdownContainer);

    select.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    select.addEventListener('click', event => {
      event._clickOnSelect = true;
    });
    window.addEventListener('click', event => {
      if (event._clickOnSelect) return;
      arrow.classList.remove('is-open');
      dropdownContainer.classList.remove('is-open');
      dropdownContainer.classList.add('is-close');
    })

    return {select, formValue}
  }




  const select = createSelect(optionsName, 'kd-choice');
  const select1 = createSelect(optionsName, 'kd-choice');
  const select2 = createSelect(optionsName, 'kd-choice');
  const select3 = createSelect(optionsName, 'kd-choice');
  const container = document.getElementById('kd-choice-0');
  container.append(select.select, select1.select, select2.select, select3.select);

  select.select.addEventListener('submit', () => {
    console.log('value', select.formValue.value);

  })

}) ();
