var yellowlightApp = angular.module('yellowlightApp', []);

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

yellowlightApp.controller('PullRequestController', function($scope, $q, PullRequestFactory) {
	$scope.allPullRequests = [];
	
	$scope.getPageOfPullRequests = function(page) {
		return PullRequestFactory.getPullRequests(page).then(function(pageOfPullRequests) {
			return pageOfPullRequests;
		});
	}

	$scope.getAllPullRequests = function() {

		allPromisesForPagesOfPullRequests = [];

		for (var i = 0; i < 100; i++) {
			console.log("FETCHING PAGE ", i);
			allPromisesForPagesOfPullRequests[i] = $scope.getPageOfPullRequests(i);
			console.log("RETURNING PROMISE ", allPromisesForPagesOfPullRequests[i]);
		};

		$q.all(allPromisesForPagesOfPullRequests).then(function(allResolvedPagesOfPullRequests) {
			console.log("ALL PROMISES RESOLVED!", allResolvedPagesOfPullRequests);
			for (var i = 0; i < allResolvedPagesOfPullRequests.length; i++) {
				$scope.allPullRequests = $scope.allPullRequests.concat(allResolvedPagesOfPullRequests[i]);
			}
		})
	};

	$scope.getAllPullRequests();
});