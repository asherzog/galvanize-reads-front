$(() => {
  getAuthors()
    .then(displayAuthors);
});

function displayAuthors(results) {
  results.forEach(author => {
    $('#authorsHere').append(`
      <div class="panel panel-default">
        <div class="panel-heading">
          <h1 class="panel-title text-center">${author.first_name} ${author.last_name}</h1>
        </div>
        <div class="panel-body row">
          <div id="coverPic" col-xs-3>
            <img src="${author.portrait_url}">
          </div>
          <div col-xs-7>
            <p>${author.biography}</p>
          </div>
          <div class="editDelete col-xs-2">
            <a href="/edit.html?id=${author.id}" class="btn btn-warning">Edit</a>
            <a href="/delete.html?id=${author.id}" class="btn btn-danger">Remove</a>
          </div>
        </div>
      </div>
      `);
  });
}
