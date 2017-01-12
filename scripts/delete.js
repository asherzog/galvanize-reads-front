$(() => {
  getBook(bookId)
    .then(displayBook);

  $('#deleteBtn').click(deleteBook);
});

const parsedParts = window.location.search.split('=');
const bookId = parsedParts[1];

function displayBook(results) {
  let book = results[0];
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
      </div>
    </div>
    `);
}

function deleteBook(event) {
  event.preventDefault();
  return $.ajax({
    url: `${API_URL}/books/${bookId}`,
    type: 'DELETE',
    DataType: 'json',
    success: function() {
      window.location = '/books.html';
    }
  });
}
