var yellowlightApp = angular.module('yellowlightApp', ['ui.bootstrap']);

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
	
	$scope.max = 100;
	$scope.dynamic = 0;

	$scope.allPullRequests = [];
	
	$scope.getPageOfPullRequests = function(page) {
		return PullRequestFactory.getPullRequests(page).then(function(pageOfPullRequests) {
			$scope.dynamic++;
			return pageOfPullRequests;
		});
	}

	$scope.getAllPullRequests = function() {
		$scope.dynamic = 0;
		allPromisesForPagesOfPullRequests = [];

		for (var i = 0; i < 100; i++) {
			console.log("FETCHING PAGE ", i);
			allPromisesForPagesOfPullRequests[i] = $scope.getPageOfPullRequests(i);
		};

		$q.all(allPromisesForPagesOfPullRequests).then(function(allResolvedPagesOfPullRequests) {
			console.log("ALL PROMISES RESOLVED!");
			for (var i = 0; i < allResolvedPagesOfPullRequests.length; i++) {
				$scope.allPullRequests = $scope.allPullRequests.concat(allResolvedPagesOfPullRequests[i]);
			}
		})
	};

});