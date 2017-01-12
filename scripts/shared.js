const API_URL = getHostURL();

function getHostURL() {
  if (window.location.host.indexOf('localhost') != -1) {
    return 'http://localhost:3000';
  } else {
    return 'https://andyreads.herokuapp.com';
  }
};

function getBook(id) {
  return $.get(`${API_URL}/books/${id}`);
}


function getAuthors() {
  return $.get(`${API_URL}/authors`);
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
