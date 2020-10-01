const { Octokit } = require("@octokit/rest");
const octokit = new Octokit();

var tl = require('azure-pipelines-task-lib/task')

async function run() {
    const github_token = tl.getInput('gitHubConnection', true)
    
    const octokit = new Octokit({
        auth: github_token
    })

    const { data: pullRequest } = await octokit.pulls.get({
        owner: "KevinDeJong-TomTom",
        repo: "commisery-task",
        pull_number: 1,
    });

    const { data: commits } = await octokit.pulls.listCommits({
        owner: "KevinDeJong-TomTom",
        repo: "commisery-task",
        pull_number: 1,
    });

    await commits.forEach(check_commit);
}

async function check_commit(item, index) {
    await tl.tool('commisery-verify-msg').line(item['sha']).exec()
}

run()