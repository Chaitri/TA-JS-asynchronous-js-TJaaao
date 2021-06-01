let input = document.querySelector('input');
let rootImages = document.querySelector('.images');

function displayImageUI(response) {
  let images = response.results;
  rootImages.innerHTML = '';
  images.forEach((img) => {
    let imgElm = document.createElement('img');
    imgElm.src = img.urls.thumb;
    imgElm.alt = img.alt_description;
    rootImages.append(imgElm);
  });
}

function handleSearch(event) {
  if (event.keyCode === 13) {
    let xhr = new XMLHttpRequest();
    let query = 'random';
    let accessKey = 'SfZP2Mp-KS1vhrctQ0iDtyHYzbFIkRmwsTJ-npFZQm4';
    if (event.target.value) query = event.target.value;
    xhr.open(
      'GET',
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`
    );
    xhr.onload = function () {
      let response = JSON.parse(xhr.response);
      displayImageUI(response);
    };
    xhr.send();
    event.target.value = '';
  }
}

input.addEventListener('keyup', handleSearch);
