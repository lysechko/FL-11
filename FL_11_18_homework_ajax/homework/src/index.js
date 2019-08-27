const root = document.getElementById('root');
const spinner = document.createElement('div');

const showLoader = () => spinner.classList.add('loader');
const hideLoader = () => spinner.classList.remove('loader');

const getData = async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const response = await fetch(url);
    const data = await response.json();
    await hideLoader();
    return data;
  } catch (e) {
    console.error(e);
  }
};

const getPosts = async userId => {
  try {
    const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

const getComments = async postId => {
  try {
    const url = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

const getUserPick = async () => {
  try {
    const url = 'https://api.thecatapi.com/v1/images/search?size=full';
    const response = await fetch(url);
    const data = await response.json();
    return data[0].url;
  } catch (e) {
    console.error(e);
  }
};

const PostPage = async () => {
  root.innerHTML = '';
  root.append(spinner);
  showLoader();
  let post = await getData();
  const listItems =
    post.length > 0 &&
    post
      .map(
        item => `<li id=${item.id}>
        <div>
 <div class="image"></div></div>
      <div class="block">
      <p class="description">${item.name}</p>
      <p>${item.company.name}</p>
      <p>${item.email}</p>
      <button class="modify">Modify</button>
      <button class="remove">Delete</button>
    </div>
      </li>`
      )
      .join('');
  return `<h1>List of Users</h1>
        <ul>${listItems}</ul>
  `;
};

const deleteData = async id => {
  try {
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    const response = await fetch(url, {
      method: 'DELETE'
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

const modifyData = async (id, data) => {
  try {
    const headers = {
      'Content-Type': 'application/json;charset=utf-8'
    };
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({ data })
    });
    const content = await response.json();
    return content;
  } catch (e) {
    console.error(e);
  }
};

const modifyUser = async userId => {
  root.innerHTML = '';
  root.append(spinner);
  showLoader();
  const userPosts = await getPosts(userId);
  const users = await getData().then(result => result[userId - 1]);
  const postIds = userPosts.map(item => item.id);
  const userPostComments = [];
  users && ({ name } = users);

  for (const Id of postIds) {
    userPostComments.push(getComments(Id));
  }

  const postComments = await Promise.all(userPostComments);

  const listItems = userPosts
    .map(
      (item, i) => `
  <div class="posts">Post#${i + 1}:${item.body}<hr/>
  ${postComments[i]
    .map(
      comment =>
        `<div class=comment><p><span class="name">${comment.name}</span> ${comment.body}</p></div>`
    )
    .join('')}</div>`
    )
    .join('');
  listItems && (await hideLoader());
  return `<h1>Posts of ${name}</h1><ul>${listItems}</ul>`;
};

const routes = {
  '/': PostPage(),
  '/users/:id': modifyUser()
};

const router = async () => {
  let route = window.location.hash
    .slice(1)
    .split('/')
    .filter(Boolean);

  let url;

  if (route[0] === 'users') {
    url = '/users/:id';
  } else {
    url = route ? '/' + route : '/';
  }

  root.innerHTML = await routes[url];

  let ul = document.getElementsByTagName('ul')[0];
  let image = document.getElementsByClassName('image');
  const btnSave = document.getElementsByClassName('save')[0];

  const href = [];
  for (let i = 1; i <= image.length; i++) {
    href.push(getUserPick());
  }

  const hrefImage = await Promise.all(href);

  for (let i = 0; i < image.length; i++) {
    let img = new Image();
    img.src = hrefImage[i];
    image[i].appendChild(img);
  }

  function handlerModifyClick(e) {
    const node = e.target.closest('li');
    const userId = node.getAttribute('id');
    if (e.target.className === 'description') {
      window.location.href = `#/users/${userId}`;
      routes['/users/:id'] = modifyUser(userId);
    }
  }

  function handlerbtnSave() {
    routes['/'] = PostPage();
    window.location.href = '#/';
  }

  const handlerbtnDelete = async e => {
    const node = e.target.closest('li');
    if (e.target.className === 'remove') {
      const btnId = node.getAttribute('id');
      node.remove();
      await deleteData(btnId);
    }
  };

  const modify = async e => {
    const node = e.target.closest('li');
    if (e.target.className === 'modify') {
      const div = document.createElement('div');
      const description = node.getElementsByClassName('description')[0];
      const el = `<input type=text value='${description.textContent}'/><button class="save">Save</button>`;
      let block = node.getElementsByClassName('block')[0];
      div.className = 'input';
      div.innerHTML = el;
      description.remove();
      block.insertAdjacentElement('afterbegin', div);
    }
  };

  const save = async e => {
    const node = e.target.closest('li');
    if (e.target.className === 'save') {
      const userId = +node.getAttribute('id');
      const input = node.getElementsByTagName('input')[0];
      const divInput = node.getElementsByClassName('input')[0];
      const block = node.getElementsByClassName('block')[0];
      const p = document.createElement('p');
      p.className = 'description';
      p.textContent = input.value;
      divInput.remove();
      block.insertAdjacentElement('afterbegin', p);
      await modifyData(userId, `name:${input.value}`);
    }
  };

  ul && ul.addEventListener('click', handlerModifyClick);
  ul && ul.addEventListener('click', handlerbtnDelete);
  ul && ul.addEventListener('click', modify);
  ul && ul.addEventListener('click', save);
  btnSave && btnSave.addEventListener('click', handlerbtnSave);
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
