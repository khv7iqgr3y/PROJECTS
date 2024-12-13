
async function fetchRepositories() {
    const username = 'khv7iqgr3y'; 
    const apiUrl = `https://api.github.com/users/${username}/repos`;

    try {
        const response = await fetch(apiUrl);
        const repos = await response.json();

       
        const repositoriesContainer = document.getElementById('repo-list');

        
        repos.forEach(repo => {
            const repoCard = document.createElement('div');
            repoCard.className = 'repo-card';

            repoCard.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || 'No description available.'}</p>
                <a href="${repo.html_url}" target="PROJECTS">View on GitHub</a>
            `;

            repositoriesContainer.appendChild(repoCard);
        });

    } catch (error) {
        console.error('Error fetching repositories:', error);
    }
}


window.onload = fetchRepositories;
