const user = "haicanberra";
const topic = "project";
const apiUrl = `https://api.github.com/users/${user}/repos`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const repos = data.filter(repo => repo.topics.includes(topic));

        let htmlSnippet = "";
        repos.forEach(repo => {
            const repoTitle = repo.name;
            const repoDescription = repo.description ? repo.description.replace(/:white_check_mark:/g, "✅") : "";
            const repoLink = repo.html_url;
            const thumbnailUrl = `${repo.html_url}/raw/master/thumbnail.png`;

            const repoHtml = `
        <div class="cell col-sm-6 col-md-4 col-lg-4 mb-4">
          <a href="${repoLink}" target="_blank" class="cell-wrap">
            <div class="project-info">
              <h2>${repoTitle}</h2>
              <span>${repoDescription}</span>
            </div>
            <img class="img-fluid" src="${thumbnailUrl}">
          </a>
        </div>
      `;

            htmlSnippet += repoHtml;
        });

        const sectionContainer = document.querySelector('.section .container');
        const existingRow = sectionContainer.querySelector('.row.no-gutter');
        const newRow = document.createElement('div');
        newRow.classList.add('row', 'no-gutter');
        newRow.setAttribute('data-aos', 'fade-up');
        newRow.setAttribute('data-aos-delay', '200');
        newRow.innerHTML = htmlSnippet;
        sectionContainer.replaceChild(newRow, existingRow);
    })
    .catch(error => {
        console.error("Error fetching repositories:", error);
    });
