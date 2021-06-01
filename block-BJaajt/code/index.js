let input = document.querySelector('#userInput');
let profileImg = document.querySelector('#user-img');
let profileName = document.querySelector('.name');
let profileLogin = document.querySelector('.username');
let rootFollowers = document.querySelector('.followers-list');
let rootFollowing = document.querySelector('.following-list');
let btn = document.querySelector('.btn');
let catImg = document.querySelector('.img-cat');

function displayUI(userData) {
  profileImg.src = userData.avatar_url;
  profileName.innerText = userData.name;
  profileLogin.innerText = `@${userData.login}`;
}

function displayRelatedUsers(root, userArr) {
  root.innerHTML = '';
  if (userArr.length === 0) {
    for (let i = 0; i < 5; i++) {
      let img = document.createElement('img');
      img.src =
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
      img.alt = 'github follower image';
      root.append(img);
    }
  } else {
    for (let i = 0; i < 5; i++) {
      let img = document.createElement('img');
      img.src = userArr[i].avatar_url;
      img.alt = 'github follower image';
      root.append(img);
    }
  }
}

function getUser(event) {
  if (event.keyCode === 13) {
    let username = event.target.value;
    let xhr = new XMLHttpRequest();
    let followers = new XMLHttpRequest();
    let following = new XMLHttpRequest();
    xhr.open('GET', `https://api.github.com/users/${username}`);
    followers.open('GET', `https://api.github.com/users/${username}/followers`);
    following.open('GET', `https://api.github.com/users/${username}/following`);
    xhr.onload = function () {
      let userData = JSON.parse(xhr.response);
      displayUI(userData);
    };
    followers.onload = function () {
      let followersData = JSON.parse(followers.response);
      displayRelatedUsers(rootFollowers, followersData);
    };
    following.onload = function () {
      let followingData = JSON.parse(following.response);
      displayRelatedUsers(rootFollowing, followingData);
    };
    xhr.send();
    followers.send();
    following.send();
    event.target.value = '';
  }
}

function getNewCat() {
  let xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    'https://api.thecatapi.com/v1/images/search?limit=1&size=full'
  );
  xhr.onload = function () {
    let response = JSON.parse(xhr.response);
    catImg.src = response[0].url;
  };
  xhr.send();
}

input.addEventListener('keyup', getUser);
btn.addEventListener('click', getNewCat);
