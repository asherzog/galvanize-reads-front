$(() => {
  getAuthors()
    .then(getAuthorNames)
    .then(appendAuthorsToSelect);

  $('#authorBtn').click(addAuthorToList);
  $('#removeBtn').click(removeAuthorFromList);
  $('#submitBtn').click(grabFormDataAndSend);
});

function getAuthors() {
  return $.get('http://localhost:3000/authors');
}

function getAuthorNames(result) {
  let authors = [];
  let ids = [];
  result.forEach(author => {
    authors.push(`${author.last_name}, ${author.first_name}`);
    ids.push(author.id);
  });
  let authorInfo = {
    authors,
    ids
  };
  return authorInfo;
}

function appendAuthorsToSelect(authorInfo) {
  for (var i = 0; i < authorInfo.authors.length; i++) {
    $('#authorList').append(`
      <option value="${authorInfo.ids[i]}">${authorInfo.authors[i]}</option>
      `);
  }
}

function addAuthorToList(event) {
  event.preventDefault();
  let authorId = $('#authorList').val();
  let author = $('#authorList option:selected').text();
  if ($(`#authors option[value="${authorId}"]`).length == 0) {
    $('#authors').append(`<option value="${authorId}">${author}</option>`);
  }
}

function removeAuthorFromList(event) {
  event.preventDefault();
  $(`#authors option:selected`).remove();
}

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
    $.post('http://localhost:3000/books/new', form)
      .then(result => {
        console.log(result);
      });
    $('#successMsg').text('Book Added!').show();
  }
}

function validateForm(form) {
  const validTitle = typeof form.title == 'string' &&
                      form.title.trim() != '' &&
                      form.title.length < 20;
  const validGenre = typeof form.genre == 'string' &&
                      form.genre.trim() != '' &&
                      form.genre.length < 10;
  const validUrl = typeof form.cover_url == 'string' &&
                      form.cover_url.trim() != '' &&
                      form.genre.length < 40;
  const hasAuthor = form.authorsId.length > 0;

  if (validTitle) {
    if (validGenre) {
      if (validUrl) {
        if (hasAuthor) {
          return true;
        } else {
          $('#errorMsg').text('Must Have an Author').show();
        }
      } else {
        $('#errorMsg').text('Invalid URL').show();
      }
    } else {
      $('#errorMsg').text('Invalid Genre').show();
    }
  } else {
    $('#errorMsg').text('Invalid Book Title').show();
  }
}
