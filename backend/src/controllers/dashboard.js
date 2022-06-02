const { GithubAPI } = require('../api/githubAPI.mjs');
const { WakaAPI } = require('../api/wakaAPI.js');

const githubAPI = new GithubAPI();
const wakaAPI = new WakaAPI();

const getDashboard = async (req, res) => {
    const orgRepos = await githubAPI.getRepositories();
    const repoStats = await Promise.all(
        orgRepos.map(async (repo) => {
            const commitsCount = await githubAPI.getRepoCommitsCount(repo.name);
            const wakaData = await wakaAPI.getUserStats();

            return {
                ...repo,
                commits: {
                    commitsCount
                },
                activity: wakaData
            };
        })
    );
    res.send(repoStats);
};

module.exports = getDashboard;
