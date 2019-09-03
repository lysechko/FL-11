let rootNode = document.getElementById('root');
let h1 = document.createElement('h1');

h1.textContent = 'TODO cat list';
rootNode.appendChild(h1);

let input = document.createElement('input');

input.placeholder = 'Add new action';
input.type = 'text';
input.value = '';
rootNode.appendChild(input);

let btn = document.createElement('button');
btn.innerHTML = '<i class="material-icons add">add_box</i>';
rootNode.appendChild(btn);

let hr = document.createElement('hr');
rootNode.appendChild(hr);

let list = document.createElement('ul');
rootNode.appendChild(list);

btn.setAttribute('disabled', true);

function handleTyping() {
  if (input.value === '') {
    btn.setAttribute('disabled', false);
  } else {
    btn.removeAttribute('disabled');
  }
}
input.addEventListener('keyup', handleTyping);
btn.setAttribute('disabled', false);
btn.addEventListener('click', handlerBtnClick);

let i = 1;

function handlerBtnClick() {
  const max = 10;
  let inputText = input.value;
  input.value = '';
  let ulEl = document.querySelector('ul').getElementsByTagName('li');
  let listItem = document.createElement('li');
  let listText = document.createElement('span');
  let listBtnCreate = document.createElement('button');
  let listBtnDel = document.createElement('button');
  let label = document.createElement('span');
  listBtnCreate.innerHTML = '<i class="material-icons create">create</i>';
  this.setAttribute('disabled', true);
  if (ulEl.length < max) {
    listItem.appendChild(label);
    listItem.setAttribute('draggable', 'true');
    listItem.setAttribute('id', `node${i++}`);
    listText.textContent = inputText;
    list.appendChild(listItem);
    listItem.appendChild(listText);
    listItem.appendChild(listBtnCreate);
    listBtnDel.setAttribute('class', 'delete');
    listBtnDel.innerHTML = '<i class="material-icons">delete</i>';
    label.innerHTML = '<i class="material-icons"> check_box_outline_blank</i>';
    listItem.appendChild(listBtnDel);
  } else {
    h1.insertAdjacentHTML('afterend', '<p class="message">Maximum item per list are created</p>');
    this.setAttribute('disabled', true);
    input.setAttribute('disabled', true);
  }

  function handlerClickCheckbox(label, listBtnCreate) {
    listBtnCreate.setAttribute('disabled', false);
    label.innerHTML = '<i class="material-icons">check_box</i>';
  }

  function handlerClickBtnCreate(listText, listItem) {
    let inputCreate = document.createElement('input');
    let listBtnSave = document.createElement('button');
    listBtnSave.innerHTML = '<i class="material-icons save">save</i>';
    inputCreate.value = listText.textContent;
    listItem.innerHTML = '';
    listItem.appendChild(inputCreate);
    listItem.appendChild(listBtnSave);
    listBtnSave.addEventListener('click', handlerClickBtnSave.bind(this, listText, listItem, inputCreate));
  }

  function handlerClickBtnSave(listText, listItem, inputCreate, label) {
    listText.textContent = inputCreate.value;
    listItem.innerHTML = '';
    listBtnDel = document.createElement('button');
    listBtnCreate = document.createElement('button');
    listBtnDel.setAttribute('class', 'delete');
    listBtnDel.innerHTML = '<i class="material-icons">delete</i>';
    label = document.createElement('label');
    label.innerHTML = '<i class="material-icons"> check_box_outline_blank</i>';
    listBtnCreate.innerHTML = '<i class="material-icons create">create</i>';
    listItem.appendChild(label);
    listItem.appendChild(listText);
    listItem.appendChild(listBtnCreate);
    listItem.appendChild(listBtnDel);
    listBtnDel.addEventListener('click', handlerClickBtnDel.bind(this, listItem));
    listBtnCreate.addEventListener('click', handlerClickBtnCreate.bind(this, listText, listItem));
    label.addEventListener('click', handlerClickCheckbox.bind(this, label, listBtnCreate));
  }

  function handlerClickBtnDel(listItem) {
    if (ulEl.length === max) {
      let message = document.getElementsByClassName('message')[0];
      message.parentNode.removeChild(message);
      input.removeAttribute('disabled');
    }
    list.removeChild(listItem);
  }
  listBtnCreate.addEventListener('click', handlerClickBtnCreate.bind(this, listText, listItem, label));
  label.addEventListener('click', handlerClickCheckbox.bind(this, label, listBtnCreate));
  listBtnDel.addEventListener('click', handlerClickBtnDel.bind(this, listItem));

  function dragStart(e) {
    e.dataTransfer.setData('text/plain', this.outerHTML);
    e.dataTransfer.effectAllowed = 'move';
    this.classList.add('dragged');
    return false;
  }

  function dragover(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  function drop(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.localName === 'li' || e.target.localName === 'span') {
      let dropEl = e.dataTransfer.getData('text/plain');
      let el = document.getElementsByClassName('dragged')[0];
      const num2 = 2;
      const num3 = 3;
      e.target.insertAdjacentHTML('beforebegin', dropEl);
      listItem = e.target.previousSibling;
      listText = listItem.children[1];
      label = listItem.children[0];
      listBtnCreate = listItem.children[num2];
      listBtnDel = listItem.children[num3];
      listItem.addEventListener('dragover', dragover);
      listItem.addEventListener('dragstart', dragStart);
      listItem.addEventListener('drop', drop);
      listItem.children[0].addEventListener('click', handlerClickCheckbox.bind(this, label, listBtnCreate));
      listBtnCreate.addEventListener('click', handlerClickBtnCreate.bind(this, listText, listItem, label));
      listBtnDel.addEventListener('click', handlerClickBtnDel.bind(this, listItem));
      el.parentNode.removeChild(el);
    }
    return false;
  }

  listItem.addEventListener('dragover', dragover);
  listItem.addEventListener('dragstart', dragStart);
  listItem.addEventListener('drop', drop);
}
