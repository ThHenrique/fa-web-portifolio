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
          <h2>${this.name}</h2>
          <div class="image">Gif ou imagem do projeto</div>
          <p>${this.language ?? ""}
            <a href='${this.svn_url}' target='_blank'>
              <p>Saber mais</p>
            </a>
          </p>
        </li>     
        `
      );
    });
  });

  function filterRepositories(repos) {
    return repos.filter((repo) => !repo.fork);
  }
};
