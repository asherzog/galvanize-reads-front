$(() => {
  getBooks()
    .then(displayResults)
});

function getBooks() {
  return $.get('http://localhost:3000/books');
}

function displayResults(results) {
  results.forEach(book => {
    let authors = '';
    if (book.authors.length > 1){
      let arr = [];
      book.authors.forEach(author => {
        arr.push(author.first_name + ' ' + author.last_name);
      });
      let result = arr.join(' & ');
      authors += result;
    } else {
      book.authors.forEach(author => {
        authors += `${author.first_name} ${author.last_name} `;
      });
    }
    $('#booksHere').append(`
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">${book.title}</h3>
        </div>
        <div class="panel-body">
          <div id="coverPic">
            <img src="${book.cover_url}">
          </div>
          <div>
            <h4>By: ${authors}</h4>
            <h6>${book.genre}</h6>
            <p>${book.description}</p>
          </div>
        </div>
      </div>
      `);
  });
}
