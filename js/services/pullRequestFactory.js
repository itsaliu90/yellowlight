yellowlightApp.factory('PullRequestFactory', function($q) {

	return {
		getPullRequests: function(page) {
			return $q(function(resolve, reject) {
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
				    page: page
				}, function(err, res) {
				    resolve(res);
				});
			})
		}
	}

});