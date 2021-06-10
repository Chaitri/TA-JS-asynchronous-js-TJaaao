const root = document.querySelector('.news');
const selectElm = document.querySelector('#news-source');
const loader = document.querySelector('.loader');
const optionsElm = document.querySelector('.options');
let data = [];

function displayUI(newsData) {
  root.innerHTML = '';
  newsData.forEach((news) => {
    let div = document.createElement('div');
    let img = document.createElement('img');
    let article = document.createElement('article');
    let p = document.createElement('p');
    let h3 = document.createElement('h3');
    let a = document.createElement('a');

    div.classList.add('news-item', 'flex');
    img.src = news.imageUrl;
    img.alt = 'news-img';
    article.classList.add('news-article');
    p.innerText = news.newsSite;
    h3.innerText = news.title;
    a.setAttribute('href', news.url);
    a.classList.add('btn');
    a.innerText = 'Read More';

    article.append(p, h3, a);
    div.append(img, article);

    root.append(div);
  });
}

function displayOption(newsData) {
  selectElm.innerHTML = '';
  let newsSources = newsData.reduce((acc, cv) => {
    if (!acc.includes(cv.newsSite)) {
      acc.push(cv.newsSite);
    }
    return acc;
  }, []);

  newsSources.forEach((newsSource) => {
    let option = document.createElement('option');
    option.setAttribute('value', newsSource);
    option.innerText = newsSource;
    selectElm.append(option);
  });
}

loader.style.display = 'inline-block';
fetch('https://api.spaceflightnewsapi.net/v3/articles')
  .then((resp) => {
    if (!resp.ok) {
      throw new Error('An Error Occured while Fetching Data');
    } else {
      return resp.json();
    }
  })
  .then((resp) => {
    data = resp;
    displayUI(data);
    displayOption(data);
  })
  .catch((error) => {
    let errorMsg = document.createElement('div');

    if (!navigator.onLine) {
      errorMsg.innerText = 'You are offline! ✖';
    } else {
      errorMsg.innerText = error;
    }
    errorMsg.classList.add('error');
    optionsElm.innerHTML = '';
    root.innerHTML = '';
    root.append(errorMsg);
  });

selectElm.addEventListener('change', (event) => {
  let filteredNews = data.filter(
    (newsItem) => newsItem.newsSite === event.target.value
  );
  displayUI(filteredNews);
});
