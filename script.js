async function getRepositories() {
    const username = document.getElementById('username').value;
    const repositoriesDiv = document.getElementById('repositories');
    const loader = document.getElementById('loader');

    // Show loader
    loader.style.display = 'block';

    // Fetch repositories
    try {
        const response = await fetch(`/repositories?username=${username}`);
        const data = await response.json();

        // Hide loader
        loader.style.display = 'none';

        // Display repositories
        repositoriesDiv.innerHTML = '<h2>Repositories</h2>';
        data.forEach(repo => {
            repositoriesDiv.innerHTML += `<div>
                <h3>${repo.name}</h3>
                <p>Topics: ${repo.topics.join(', ')}</p>
            </div>`;
        });
    } catch (error) {
        // Handle errors
        console.error('Error fetching repositories:', error);
        loader.style.display = 'none';
        repositoriesDiv.innerHTML = `<p>Error fetching repositories. Please try again.</p>`;
    }
}
