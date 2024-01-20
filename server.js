const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/repositories', async (req, res) => {
    const username = req.query.username;

    try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`);
        const repositories = response.data.map(repo => {
            return {
                name: repo.name,
                topics: repo.topics || []  // Assuming topics is an array in the GitHub API response
            };
        });

        res.json(repositories);
    } catch (error) {
        console.error('Error fetching repositories:', error);
        res.status(500).json({ error: 'Error fetching repositories' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
