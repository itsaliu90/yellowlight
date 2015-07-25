var GitHubApi = require("github");

var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub
    pathPrefix: "", // for some GHEs; none for GitHub
    timeout: 5000,
    headers: {
        "user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent
    }
});

console.log("GITHUB USERNAME IS ", process.env.GITHUB_USERNAME);

github.authenticate({
    type: "basic",
    username: process.env.GITHUB_USERNAME,
    password: process.env.GITHUB_PASSWORD
});

github.pullRequests.getAll({
    // optional:
    // headers: {
    //     "cookie": "blahblah"
    // },
    user: "SolarCS",
    repo: "banff",
    state: "closed",
    page: 1
}, function(err, res) {
    console.log("The number of PRs is ", res.length);
    console.log(JSON.stringify(res));
});