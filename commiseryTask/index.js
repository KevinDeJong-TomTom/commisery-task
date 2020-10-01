const { Octokit } = require("@octokit/rest");
const octokit = new Octokit();

var tl = require('azure-pipelines-task-lib/task')

async function run() {
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

    await tl.tool('commisery-verify-msg').line(commits[0]['sha']).exec()

    console.log(commits)
}

run()