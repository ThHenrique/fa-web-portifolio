jQuery.githubUser = function (username, callback) {
  jQuery.getJSON(`https://api.github.com/users/${username}/repos`, callback);
};

jQuery.fn.loadRepositories = function (username) {
  this.html(
    /*html */
    `<div class="loadercontainer">
      <div id="loading">
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
        Carregando...
      </div>
    </div>`
  );

  var target = this;
  $.githubUser(username, function (data) {
    var repositories = filterRepositories(data);

    var list = $("<ul/>");
    target.empty().append(list);
    $(repositories).each(function () {
      list.append(
        /* html */
        `  
        <li class="card">
          <img
          class="card-img-top"
          src='https://raw.githubusercontent.com/${username}/${this.name}/${
          this.default_branch
        }/.github/cover.png' alt="${this.name}-logo" />
          <section class="card-body">
            <h4 class="card-title">${this.name}</h4>
            <p card="card-text">${this.description ?? ""}</p>
            <p card="card-text">${this.language ?? ""}</p>
            <a class="btn btn-outline-dark" href='${
              this.svn_url
            }' target='_blank'>Saber mais</a>
          </section>
        </li>     
        `
      );
    });
  });

  function filterRepositories(repos) {
    return repos.filter((repo) => !repo.fork);
  }
};
