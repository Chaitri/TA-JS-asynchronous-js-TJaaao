const rootElm = document.querySelector('.todos');
const toDoInput = document.querySelector('.todo_input');
const filterInput = document.querySelector('.filter');
const all = document.getElementById('all');
const active = document.getElementById('active');
const completed = document.getElementById('completed');
const baseUrl = 'https://sleepy-falls-37563.herokuapp.com/api/todo/';
let allItems;

function addToDo(event) {
  if (event.keyCode === 13 && event.target.value !== '') {
    let toDoItem = {
      todo: {
        title: event.target.value,
      },
    };
    fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toDoItem),
    })
      .then(() => getToDoList())
      .then((resp) => renderItems(resp, rootElm));

    event.target.value = '';
  }
}

function handleEdit(event, id) {
  let input = document.createElement('input');
  input.value = event.target.innerText;
  let p = event.target;
  let parent = event.target.parentElement;
  parent.replaceChild(input, p);

  input.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && event.target.value !== '') {
      let toDoItem = {
        todo: {
          title: event.target.value,
        },
      };
      fetch(baseUrl + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toDoItem),
      })
        .then(() => getToDoList())
        .then((resp) => renderItems(resp, rootElm));
    }
  });
}

function removeItem(event) {
  let id = event.target.dataset.id;
  fetch(baseUrl + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(() => getToDoList())
    .then((resp) => renderItems(resp, rootElm));
}

function changeItem(event) {
  let id = event.target.dataset.id;
  let title = event.target.nextElementSibling.innerText;
  let isChecked = event.target.checked;

  let toDoItem = {
    todo: {
      title: title,
      isCompleted: isChecked,
    },
  };
  fetch(baseUrl + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toDoItem),
  }).then(() => getToDoList());
}

function getToDoList() {
  return fetch(baseUrl)
    .then((resp) => resp.json())
    .then((resp) => {
      allItems = resp.todos;
      return allItems;
    });
}

function renderItems(data, rootElm) {
  rootElm.innerHTML = '';

  data.forEach((item) => {
    let li = document.createElement('li');
    let div = document.createElement('div');
    let checkBox = document.createElement('input');
    let p = document.createElement('p');
    let icon = document.createElement('i');

    checkBox.type = 'checkbox';
    checkBox.classList.add('check');
    checkBox.setAttribute('data-id', item._id);
    checkBox.addEventListener('change', changeItem);
    checkBox.checked = item.isCompleted;

    p.innerText = item.title;
    p.addEventListener('dblclick', () => {
      handleEdit(event, item._id);
    });

    div.append(checkBox, p);
    div.classList.add('todo_details');

    icon.classList.add('far', 'fa-times-circle', 'delete');
    icon.setAttribute('data-id', item._id);
    icon.addEventListener('click', removeItem);

    li.classList.add('todo_item');
    li.append(div, icon);

    rootElm.append(li);
  });

  filterInput.style.display = 'flex';
}

function showAll() {
  getToDoList().then(() => renderItems(allItems, rootElm));
}

function showActive() {
  getToDoList().then((resp) => {
    let activeItems = [];
    activeItems = resp.filter((item) => !item.isCompleted);
    renderItems(activeItems, rootElm);
  });
}

function showCompleted() {
  getToDoList().then((resp) => {
    let completedItems = [];
    completedItems = resp.filter((item) => item.isCompleted);
    renderItems(completedItems, rootElm);
  });
}

toDoInput.addEventListener('keyup', addToDo);
all.addEventListener('click', showAll);
active.addEventListener('click', showActive);
completed.addEventListener('click', showCompleted);

showAll();
