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
    let query = 'random';
    let accessKey = 'SfZP2Mp-KS1vhrctQ0iDtyHYzbFIkRmwsTJ-npFZQm4';
    if (event.target.value) query = event.target.value;
    let url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;
    let resp = fetch(url)
      .then((resp) => {
        displayImageUI(resp);
      })
      .catch((error) => {
        console.log(error);
      });
    event.target.value = '';
  }
}

function fetch(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => resolve(JSON.parse(xhr.response));
    xhr.onerror = () => reject('Error while fetching data');
    xhr.send();
  });
}

input.addEventListener('keyup', handleSearch);
