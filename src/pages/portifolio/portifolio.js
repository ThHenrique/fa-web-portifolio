jQuery.githubUser = function (username, callback) {
  jQuery.getJSON(`https://api.github.com/users/${username}/repos`, callback);
};

jQuery.fn.loadRepositories = function (username) {
  this.html(
    "<span>Querying GitHub for " + username + "'s repositories...</span>"
  );

  var target = this;
  $.githubUser(username, function (data) {
    var repos = data;

    sortByNumberOfWatchers(repos);

    var list = $("<ul/>");
    target.empty().append(list);
    $(repos).each(function () {
      list.append(
        /* html */
        `  
        <li class="card">
          <h2>${this.name}</h2>
          <div class="image">Gif ou imagem do projeto</div>
          <p>${this.language ?? ""}</p>
          <a href='${this.svn_url}' target='_blank'>
            <p>Ver no gitHub</p>
          </a>
        </li>     
        `
      );
    });
  });

  function sortByNumberOfWatchers(repos) {
    repos.sort(function (a, b) {
      return b.watchers - a.watchers;
    });
  }
};
