// URL of the GitHub API to fetch the repositories
const apiUrl = 'https://api.github.com/users/haicanberra/repos';

// Fetch repositories from the GitHub API
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const reposList = document.getElementById('repos-list');

        // Filter repositories based on the tag
        const filteredRepos = data.filter(repo => {
            const tags = repo.topics || [];
            return tags.includes('project');
        });

        // Iterate over the filtered repositories and create list items
        filteredRepos.forEach(repo => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            const description = document.createElement('p');

            // Set the link's text, href, and target attributes
            link.textContent = repo.name;
            link.href = repo.html_url;
            link.target = '_blank';

            // Check if the repository description contains :white_check_mark:
            if (repo.description.includes(':white_check_mark:')) {
                // Create <g-emoji> element for :white_check_mark: emoji
                const emojiElement = document.createElement('g-emoji');
                emojiElement.setAttribute('class', 'g-emoji');
                emojiElement.setAttribute('alias', 'white_check_mark');
                emojiElement.setAttribute('fallback-src', 'https://github.githubassets.com/images/icons/emoji/unicode/2705.png');
                emojiElement.textContent = '✅';

                // Set the repository description
                description.appendChild(emojiElement);

                // Remove :white_check_mark: from the description
                repo.description = repo.description.replace(/:white_check_mark:/g, '');
            }

            description.innerHTML += repo.description;

            listItem.appendChild(link);
            listItem.appendChild(description);
            reposList.appendChild(listItem);
        });
    })
    .catch(error => console.error(error));
