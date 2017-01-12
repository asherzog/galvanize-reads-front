$(() => {
  getBooks()
    .then(displayResults)
});

function getBooks() {
  return $.get(`${API_URL}/books`);
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
          <h1 class="panel-title text-center">${book.title}</h1>
        </div>
        <div class="panel-body row">
          <div id="coverPic" col-xs-3>
            <img src="${book.cover_url}">
          </div>
          <div col-xs-7>
            <h4>By: ${authors}</h4>
            <h6>${book.genre}</h6>
            <p>${book.description}</p>
          </div>
          <div class="editDelete col-xs-2">
            <a href="/edit.html?id=${book.id}" class="btn btn-warning">Edit</a>
            <a href="/delete.html?id=${book.id}" class="btn btn-danger">Remove</a>
          </div>
        </div>
      </div>
      `);
  });
}
