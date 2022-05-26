import express from 'express';
import cors from 'cors';
import { GithubAPI } from './githubAPI.mjs';
import { WakaAPI } from './wakaAPI.mjs';

const app = express()
const port = 4000

app.use(cors())


const githubAPI = new GithubAPI();
const wakaAPI = new WakaAPI();


app.get('/', async (req, res) => {
  
    const orgRepos = await githubAPI.getRepositories();

    const repoStats = await Promise.all(orgRepos.map(async (repo) => {
        const commitsCount = await githubAPI.getRepoCommitsCount(repo.name);
        const wakaData = await wakaAPI.getUserStats();
        
        return {
            ...repo,
            commits: {
                commitsCount
            },
            activity: wakaData
        };
    }));
    res.send(repoStats)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
