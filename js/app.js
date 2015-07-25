var yellowlightApp = angular.module('yellowlightApp', []);

yellowlightApp.factory('PullRequestFactory', function($q) {

	return {
		getPullRequests: function() {
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
				    page: 1
				}, function(err, res) {
				    console.log("The number of PRs is ", res.length);
				    resolve(res);
				});
			})
		}
	}

});

yellowlightApp.controller('PullRequestController', function($scope, PullRequestFactory) {
	$scope.pullRequests;
	$scope.getPullRequests = function() {
		PullRequestFactory.getPullRequests().then(function(data) {
			$scope.pullRequests = data;
		});
	};
	$scope.getPullRequests();
});