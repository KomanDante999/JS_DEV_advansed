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


  function createSelect(OptionsName) {
    // head
    for (const option of OptionsName) {
      if (option.selected === true) {
        const head = document.createElement('button');
        head.classList.add('kd17choice-head');
        head.value = option.value;

        const caption = document.createElement('span');
        caption.classList.add('kd17choice-head--caption');
        caption.textContent = option.name;

        const arrow = document.createElement('span');
        arrow.classList.add('kd17choice-head--arrow');
        arrow.innerHTML = arrowDown;
      }
    }


  }

  const select = createSelect(OptionsName);
  const container = document.getElementById('kd17choice-0');
  container.append(select);
}) ();
