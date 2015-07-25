yellowlightApp.controller('PullRequestController', function($scope, $q, PullRequestFactory, SearchFactory) {
	
	$scope.max = 100;
	$scope.dynamic = 0;

	$scope.pullRequestsAddressingBugs = [];

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

	$scope.searchForFixPRs = function() {
		SearchFactory.searchForFixPRs($scope.allPullRequests);
		$scope.pullRequestsAddressingBugs = SearchFactory.arrayOfPRsAddressingBugs;
	}

});