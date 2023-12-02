const loaderContainerEl = window.document.querySelector(".loadercontainer");

function githubUser(username, callback) {
  fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
    .then((response) => response.json())
    .then((data) => callback(data))
    .catch(() => {
      alert("Algo inesperado aconteceu");
    })
    .finally(() => {
      loaderContainerEl.classList.add("hidden");
    });
}

function loadRepositories() {
  const username = "thhenrique";

  githubUser(username, function (data) {
    const repositories = filterRepositories(data);

    const apiProjectsRepository = filterApiFatecRepositories(data)

    handleAddRepositoriesInSection(apiProjectsRepository, "#api-cards-wrap")
    handleAddRepositoriesInSection(repositories, "#cards-wrap")
  });

  function handleAddRepositoriesInSection(repositories, elementId, sectionName) {
    const listContainerEl = window.document.querySelector(`${elementId}`);

    const list = document.createElement("ul");

    repositories.forEach((item) => {
      const card = document.createElement("li");
      card.classList.add("card");

      const img = document.createElement("img");
      const coverSrc = `https://raw.githubusercontent.com/${username}/${item.name}/${item.default_branch}/.github/cover.png`;

      img.src = coverSrc;
      img.classList.add("card-img-top");
      img.alt = `${item.name}-logo`;

      img.addEventListener("error", () => {
        img.src = "../../assets/images/cover-default-github.png";
      });
      card.appendChild(img);

      const section = document.createElement("section");
      section.classList.add("card-body");

      section.innerHTML = ` 
        <h4 class="card-title">${item.name}</h4>
        <p card="card-text">${item.description ?? ""}</p>
        <p card="card-text">${item.language ?? ""}</p>
        <a class="btn btn-outline-dark" href='${
          item.svn_url
        }' target='_blank'>Saber mais</a>
        `;

      card.appendChild(section);

      list.appendChild(card);
    });
    listContainerEl.appendChild(list);
  }

  function filterRepositories(repos) {
    return repos.filter((repo) => !repo.fork);
  }

  function filterApiFatecRepositories(repos) {
    const apiList = [
      "fa-mood-hound-documentation",
      "fa-owl-partners-documentation",
      "fa-cloud-fox-documentation",
      "fa-help-duck-documentation",
      "fa-polaris-documentation",
      "fa-public-data-analysis-documentation"
    ]
    
    return repos.filter((repo) => apiList.includes(repo.name));
  }
}

loadRepositories();
