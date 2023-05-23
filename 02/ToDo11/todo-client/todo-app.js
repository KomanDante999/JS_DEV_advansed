(function() {
  let listCase = [],
  listNameStorage = '',
  myListCaseDefault = [
    {id: 0, name: 'моё запланированное дело 1', done: false},
    {id: 1, name: 'моё запланированное дело 2', done: false},
    {id: 2, name: 'моё запланированное дело 3', done: false},
    {id: 3, name: 'моё запланированное дело 4', done: false},
    {id: 4, name: 'моё запланированное дело 5', done: false},
  ],
  momListCaseDefault = [
    {id: 0, name: 'мамино запланированное дело 1', done: false},
    {id: 1, name: 'мамино запланированное дело 2', done: false},
    {id: 2, name: 'мамино запланированное дело 3', done: false},
    {id: 3, name: 'мамино запланированное дело 4', done: false},
    {id: 4, name: 'мамино запланированное дело 5', done: false},
  ],
  dadListCaseDefault = [
    {id: 0, name: 'папино запланированное дело 1', done: false},
    {id: 1, name: 'папино запланированное дело 2', done: false},
    {id: 2, name: 'папино запланированное дело 3', done: false},
    {id: 3, name: 'папино запланированное дело 4', done: false},
    {id: 4, name: 'папино запланированное дело 5', done: false},
  ];

  // дополнение
  // кнопки очистки списка и восстановлениея списка по умолчанию
  function createCleanDefaultBtn() {
    let buttonWrapper = document.createElement('div');
    let buttonClean = document.createElement('button');
    let buttonDefault = document.createElement('button');

    buttonWrapper.classList.add('d-flex', 'justify-content-end', 'align-items-center', 'mb-5');
    buttonClean.classList.add('btn', 'btn-outline-primary', 'mr-2');
    buttonClean.textContent = 'Очистить список дел';
    buttonDefault.classList.add('btn', 'btn-outline-primary');
    buttonDefault.textContent = 'Вернуть список дел по умолчанию';

    buttonWrapper.append(buttonClean);
    buttonWrapper.append(buttonDefault);

    return {
      buttonWrapper,
      buttonClean,
      buttonDefault,
    }
  }

  // создаем и возврпщаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle
  }

  // создаем и возврпщаем форму для создания дела
  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';
    button.disabled = true;
    input.addEventListener('input', function() {
      if (input.value) {
        button.disabled = false;
      } else {
        button.disabled = true;
      }
    });

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };
  };

 // создаем и возврпщаем ul
  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  // получение уникального id
  function getUniqId(array, lowLimit) {
    let maxId = lowLimit;
    for (const item of array) {
      if (item.id > maxId) {
        maxId = item.id;
      }
    }
    return maxId + 1;
  }

  // сохранение в storage
  function saveListStorage(array, keyName) {
    localStorage.setItem(keyName, JSON.stringify(array))
  }

  // удаление из массива
  function deletingFromArray(array, item) {
    for (let i = 0; i < array.length; i++) {
      let deletedCase = array[i];
      if (deletedCase.id == item.value) {
        array.splice(i, 1);
      }
    }
  }

  // создание дела
  function createTodoItem(obj) {
    let item = document.createElement('li');
    // кнопки помещаем в элемент, который красиво покажет их в одной группе
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    // стили для элемента списка и для размещения кнопок
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = obj.name;
    item.value = obj.id;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    if (obj.done) {
      item.classList.add('list-group-item-success');
    }

    // добавляем обработчики событий на кнопки
    // done
    doneButton.addEventListener('click', function () {
      item.classList.toggle('list-group-item-success');
      for (const changeableCase of listCase) {
        if (changeableCase.id == item.value) {
          changeableCase.done = !changeableCase.done;
        }
      }
      // сохраняем в storage
      saveListStorage(listCase, listNameStorage);
    });
    // delete
    deleteButton.addEventListener('click', function () {
      if (confirm('Вы уверены?')) {
        item.remove();
        // удаление из массива
        deletingFromArray(listCase, item)
      }
      // сохраняем в storage
      saveListStorage(listCase, listNameStorage);
    });

    // вкладываем кнопки в один элемент
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {
      item,
      doneButton,
      deleteButton,
    };
  };

  // восстановление данных из storage
  function restoredListStorage(keyName, array) {
    let localData = localStorage.getItem(keyName);
    if (localData !== null && localData !== '') {
      array = JSON.parse(localData);
    }
    return array;
  }

  // создание списка элементов из массива
  function createItemFromList(array, targetNode) {
    for (const itemFromArray of array) {
      let childNode = createTodoItem(itemFromArray);
      targetNode.append(childNode.item);
    }
  }

  // основная функция
  function createTodoApp(container, title, keyName, listDefault = []) {
    // дополнение
    let todoCleanGroup = createCleanDefaultBtn();
    container.append(todoCleanGroup.buttonWrapper);

    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    listNameStorage = keyName;

    // обеспечиваем уникальность id списка дел по умолчанию
    lowLimitId = listDefault.length;

    listCase = listDefault;

    // восстанавливаем список из storage в массив
    listCase = restoredListStorage(listNameStorage, listCase);

    // формируем список элементов из массива в указанный узел
    createItemFromList(listCase, todoList);

    // обработка события submit на форме
    todoItemForm.form.addEventListener('submit', function(e) {
      // предотвращает перезагрузку страницы при событии submit
      e.preventDefault();

      // игнорируем создание элемента, если пользователь ничего не ввел в поле
      if (!todoItemForm.input.value) {
        return;
      }

      // создание объекта с именем дела
      let newCase = {
        id: getUniqId(listCase, lowLimitId +1),
        name: todoItemForm.input.value,
        done: false
      };

      // создаем и добавляем в список новое дело с названием из поля ввода
      let todoItem = createTodoItem(newCase);
      todoList.append(todoItem.item);

      // добавление нового дела в массив
      listCase.push(newCase);
      // сохраняем в storage
      saveListStorage(listCase, listNameStorage);

      // обнуляем значение в поле, что бы не пришлось стирать его вручную
      todoItemForm.input.value = '';
      todoItemForm.button.disabled = true;
    });


    // дополнение
    // очистка списка дел
    function cleanList(array, targetNode, keyStorage) {
      array = [];
      saveListStorage(array, keyStorage);
      location.reload();
      // удаление всех элементов ul
      while (targetNode.firstElementChild) {
        targetNode.firstElementChild.remove();
      }
    }
    // действие кнопки "Очистить список дел"
    todoCleanGroup.buttonClean.addEventListener('click', function() {
      // обнуляем список и DOM
      cleanList(listCase, todoList, listNameStorage);
    });

    // действие кнопки "Вернуть список дел по умолчанию"
    todoCleanGroup.buttonDefault.addEventListener('click', function() {
      // сохраняем пользовательские дела
      let saveList = [];
      for (const element of listCase) {
        if (element.id > lowLimitId) {
          saveList.push(element)
        }
      }
      // обнуляем список и DOM
      cleanList(listCase, todoList, listNameStorage);

      // объединяем массивы
      let listConcat = listDefault.concat(saveList);

      listCase = listConcat;
      saveListStorage(listCase, listNameStorage);

      // формируем список элементов из массива в указанный узел
      createItemFromList(listCase, todoList);
    });
  }

  // засоряем глобальную облать видимости
  window.createTodoApp = createTodoApp;
  window.myListCaseDefault = myListCaseDefault;
  window.momListCaseDefault = momListCaseDefault;
  window.dadListCaseDefault = dadListCaseDefault;
})();
