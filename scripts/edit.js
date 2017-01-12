$(() => {
  getBook(bookId)
    .then(results => {
      let book = results[0];
      console.log(book);
      $('#title').val(book.title);
      $('#genre').val(book.genre);
      $('#cover').val(book.cover_url);
      $('#description').val(book.description);
      book.authors.forEach(author => {
        let person = `${author.last_name}, ${author.first_name}`;
        $('#authors').append(`<option value="${person}">${person}</option>`);
      });
    });
    getAuthors()
      .then(getAuthorNames)
      .then(appendAuthorsToSelect);

      $('#authorBtn').click(addAuthorToList);
      $('#removeBtn').click(removeAuthorFromList);
      $('#submitBtn').click(grabFormDataAndSend);

});
const parsedParts = window.location.search.split('=');
const bookId = parsedParts[1];

function grabFormDataAndSend(event) {
  event.preventDefault();
  let title = $('#title').val();
  let genre = $('#genre').val();
  let cover_url = $('#cover').val();
  let description = $('#description').val();
  let authorsId = Array.prototype.map.call($("#authors option"), function(element) {
    return $(element).val();
  });
  let form = {
    title,
    genre,
    cover_url,
    description,
    authorsId: authorsId.toString()
  };
  if (validateForm(form)) {
    $.ajax({
      type: 'PUT',
      dataType: 'json',
      url: `${API_URL}/books/${bookId}`,
      data: form
    }).then(result => {
      window.location = '/books.html';
    });
  }
}
