function setArray(arr) {
  for (let obj of arr) {
    localStorage.setItem(obj.id, JSON.stringify(obj));
  }
}

function getArray() {
  const arr = [];
  let keys = Object.keys(localStorage);
  for (let i = 0; i < keys.length; i++) {
    arr.push(JSON.parse(localStorage.getItem(keys[i])));
  }
  return arr;
}

function load() {
  if (localStorage.length > 0 && toDoItems.length === 0) {
    toDoItems = getArray();
    toDoItems = toDoItems.sort((a, b) => a.isDone - b.isDone);
  }
}

let toDoItems = [];

const mainPage = (items = []) => {
  if (localStorage.length > 0 && items.length === 0) {
    items = getArray();
    items = items.sort((a, b) => a.isDone - b.isDone);
  }
  let listHtml = '';
  listHtml =
    items.length > 0
      ? items
          .map(
            item =>
              `<li id=${item.id} class=${item.isDone ? 'selected' : 'unselected'}>
              <button class=${item.isDone ? 'checked' : 'check'}></button>
             <span class="description">${item.description}</span>
              <button class="remove"></button></li>
              `
          )
          .join('')
      : '<p class="add_heading">TODO is empty</p>';

  let mainHtml = `
    <h1>Simple TODO application</h1>
    <button class="add_task">Add new task</button>
    <ul>${listHtml}</ul> `;

  return mainHtml;
};

const addItem = () => {
  let view = `
    <h1>Add new item</h1>
    <input type="text" value="" placeholder = "Add new action">
    <button class="cancel">Cancel</button> 
    <button class="save">Save changes</button>
  `;
  return view;
};

const modifyItem = (val = '') => {
  let modifyHtml = `
    <h1>Simple TODO application</h1>
    <input type="text" value="${val}" placeholder = "Modify item">
    <button class="cancel">Cancel</button> 
    <button class="save_modification">Save changes</button>
    `;
  return modifyHtml;
};

const routes = {
  '/': mainPage(),
  '/add': addItem(),
  '/modify/:id': modifyItem()
};

function router() {
  const rootNode = document.getElementById('root');
  let route = window.location.hash
    .slice(1)
    .split('/')
    .filter(Boolean);
  console.log(route);

  let url;

  if (route[0] === 'add') {
    url = '/add';
  } else if (route[0] === 'modify') {
    url = '/modify/:id';
  } else {
    url = route ? '/' + route : '/';
  }

  rootNode.innerHTML = routes[url];

  const btnAddTask = document.getElementsByClassName('add_task')[0];
  const btnSave = document.getElementsByClassName('save')[0];
  const btnCancel = document.getElementsByClassName('cancel')[0];
  const btnSaveModif = document.getElementsByClassName('save_modification')[0];
  const input = document.getElementsByTagName('input')[0];

  if (localStorage.length > 0 && toDoItems.length === 0) {
    toDoItems = getArray();
    toDoItems.sort((a, b) => a.isDone - b.isDone);
  }
  setArray(toDoItems);

  function handlerListClick(e) {
    const node = e.target.closest('li');

    if (
      node.className === 'selected' &&
      e.target.className !== 'description' &&
      e.target.className !== 'checked' &&
      e.target.className !== 'remove'
    ) {
      alert("Danger! Your can't edit already done item");
    }

    if (e.target.className === 'check') {
      let objIndex = toDoItems.findIndex(obj => obj.id === node.getAttribute('id'));
      toDoItems[objIndex].isDone = true;
      localStorage.setItem(toDoItems[objIndex].id, JSON.stringify(toDoItems[objIndex]));
      toDoItems.forEach(function(item, i) {
        if (item.isDone) {
          toDoItems.splice(i, 1);
          toDoItems.push(item);
        }
      });
      localStorage.clear();
      setArray(toDoItems);
      location.reload();
    }

    if (e.target.className === 'description') {
      let val = e.target.textContent;
      window.location.href = `#/modify/${node.getAttribute('id')}`;
      routes['/modify/:id'] = modifyItem(val);
    }

    if (e.target.className === 'checked') {
      let objIndex = toDoItems.findIndex(obj => obj.id === node.getAttribute('id'));
      toDoItems[objIndex].isDone = false;
      localStorage.setItem(toDoItems[objIndex].id, JSON.stringify(toDoItems[objIndex]));
      toDoItems.forEach(function(item, i) {
        if (item.isDone) {
          toDoItems.splice(i, 1);
          toDoItems.push(item);
        }
      });
      console.log(toDoItems);
      localStorage.clear();
      setArray(toDoItems);
      location.reload();
    }
  }
  let ul = document.getElementsByTagName('ul')[0];
  ul && ul.addEventListener('click', handlerListClick);

  function handlerbtnAddTask() {
    window.location.href = '#/add';
  }

  function remove(e) {
    const node = e.target.closest('li');
    if (e.target.className === 'remove') {
      let objIndex = toDoItems.find(obj => obj.id === node.getAttribute('id'));
      toDoItems.splice(objIndex, 1);
      localStorage.removeItem(objIndex.id);
      location.reload();
    }
  }

  function handlerCancel() {
    window.location.hash = '#/';
  }

  function handlerSaveModification() {
    const num2 = 2;
    const id = window.location.hash
      .slice(num2)
      .split('/')
      .pop();
    const index = toDoItems.findIndex(item => item.id === id);
    if (toDoItems.find(item => item.description === input.value)) {
      alert("Danger! You can't add already existing value");
    } else {
      toDoItems[index].description = input.value;
      localStorage.clear();
      setArray(toDoItems);
      routes['/'] = mainPage(toDoItems);
      window.location.href = '#/';
    }
  }

  function handlerbtnSave() {
    let uniqueId = function() {
      const num2 = 2;
      const num16 = 16;
      const num36 = 36;

      return (
        'id-' +
        Math.random()
          .toString(num36)
          .substr(num2, num16)
      );
    };
    if (toDoItems.find(item => item.description === input.value) === undefined) {
      toDoItems.unshift({
        isDone: false,
        id: uniqueId(),
        description: `${input.value}`
      });
    } else {
      alert('Danger! The value already exists');
    }
    routes['/'] = mainPage(toDoItems);
    window.location.href = '#/';
  }

  function handleTyping() {
    if (input.value === '') {
      btnSave && btnSave.setAttribute('disabled', false);
      btnSaveModif && btnSaveModif.setAttribute('disabled', false);
    } else {
      btnSave && btnSave.removeAttribute('disabled');
      btnSaveModif && btnSaveModif.removeAttribute('disabled');
    }
  }

  btnCancel && btnCancel.addEventListener('click', handlerCancel);
  ul && ul.addEventListener('click', remove);
  btnAddTask && btnAddTask.addEventListener('click', handlerbtnAddTask);
  btnSave && btnSave.addEventListener('click', handlerbtnSave);
  btnSaveModif && btnSaveModif.addEventListener('click', handlerSaveModification);
  input && input.addEventListener('keyup', handleTyping);
  btnSave && btnSave.setAttribute('disabled', false);
  btnSaveModif && btnSaveModif.setAttribute('disabled', false);
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
window.addEventListener('load', load);
