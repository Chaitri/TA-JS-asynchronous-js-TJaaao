(function () {
  const booksRoot = document.querySelector('.books');
  const loader = document.querySelector('.loader');
  const mainSection = document.querySelector('main');
  const modal = document.querySelector('.modal');

  let booksData = [];

  function renderCharacters(charactersArr) {
    modal.style.display = 'block';
    modal.innerHTML = '';

    let p = document.createElement('p');
    p.classList.add('close');
    p.id = 'close';
    p.innerText = 'Close';
    p.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    let modalLoader = document.createElement('div');
    modalLoader.classList.add('modal-loader');
    modal.append(p, modalLoader);

    charactersArr.forEach((characterUrl) => {
      fetch(characterUrl)
        .then((resp) => resp.json())
        .then((character) => {
          let div = document.createElement('div');
          let name = document.createElement('h4');
          let gender = document.createElement('p');
          let alias = document.createElement('p');
          let tvSeries = document.createElement('p');

          div.classList.add('character');
          name.innerText = `Name: ${character.name}`;
          gender.innerText = `Gender: ${character.gender}`;
          d = character.aliases;
          alias.innerText = `Aliases: ${character.aliases.join(' , ')}`;
          tvSeries.innerText = `TV Series: ${character.tvSeries.join(' , ')}`;

          div.append(name, gender, alias, tvSeries);
          modal.append(div);
        })
        .catch((error) => {
          let p = renderError(error);
          modal.append(p);
          return;
        })
        .finally(() => {
          modalLoader.style.display = 'none';
        });
    });
  }

  function renderBooks(booksData) {
    booksData.forEach((book) => {
      let div = document.createElement('div');
      let title = document.createElement('h2');
      let author = document.createElement('p');
      let pages = document.createElement('p');
      let publisher = document.createElement('p');
      let released = document.createElement('p');
      let country = document.createElement('p');
      let btnDiv = document.createElement('div');
      let charsBtn = document.createElement('a');

      div.classList.add('book-item');
      title.innerText = book.name;
      author.innerText = book.authors.join(' ');
      author.classList.add('author');
      pages.innerText = `Pages: ${book.numberOfPages}`;
      publisher.innerText = `Publisher: ${book.publisher}`;
      released.innerText = `Released: ${new Date(book.released)
        .toISOString()
        .substring(0, 10)}`;
      country.innerText = `Country: ${book.country}`;
      charsBtn.innerText = `Show Characters (${book.characters.length})`;
      charsBtn.classList.add('btn');
      charsBtn.href = '';
      btnDiv.classList.add('btnDiv');

      charsBtn.addEventListener('click', (event) => {
        event.preventDefault();
        renderCharacters(book.characters);
      });

      btnDiv.append(charsBtn);
      div.append(title, author, pages, publisher, released, country, btnDiv);
      booksRoot.append(div);
    });
  }

  function renderError(errorMsg) {
    let p = document.createElement('p');
    p.innerText = errorMsg;
    p.classList.add('error');
    return p;
  }

  function init() {
    if (navigator.onLine) {
      fetch('https://www.anapioficeandfire.com/api/books')
        .then((resp) => {
          if (resp.ok) return resp.json();
          else
            throw new Error(
              'Error while fetching data! Please try again later.'
            );
        })
        .then((resp) => {
          booksData = resp;
          renderBooks(booksData);
        })
        .catch((error) => {
          booksRoot.innerHTML = '';
          let p = renderError(error);
          mainSection.append(p);
        })
        .finally(() => (loader.style.display = 'none'));
    } else {
      loader.style.display = 'none';
      let p = renderError('Browser is Offline!');
      mainSection.append(p);
    }
  }

  init();
})();
