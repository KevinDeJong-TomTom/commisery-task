const { Octokit } = require("@octokit/rest");
const octokit = new Octokit();

// Compare: https://docs.github.com/en/rest/reference/repos/#list-organization-repositories
const { data: pullRequest } = await octokit.pulls.get({
    owner: "KevinDeJong-TomTom",
    repo: "commisery-task",
    pull_number: 1,
  });