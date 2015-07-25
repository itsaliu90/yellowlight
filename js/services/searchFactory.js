yellowlightApp.factory('SearchFactory', function() {

	var arrayOfKeywords = ["fix", "bug", "Fix"];

	function PRObjectTitleContainsKeywords(PRObject, arrayOfKeywords) {
		for (var i = 0; i < arrayOfKeywords.length; i++) {
			if (PRObject && PRObject.title) {
				if (PRObject.title.indexOf(arrayOfKeywords[i]) != -1) {
					return true;
				};
			}
		}
		return false;
	}

	var arrayOfPRsAddressingBugs = [];

	return {
		searchForFixPRs: function(arrayOfPRs) {
			console.log(arrayOfPRs);
			console.log("SEARCHING FOR FIX PRS, USING ", arrayOfPRs);
			for (var i = 0; i < arrayOfPRs.length; i++) {
				if (PRObjectTitleContainsKeywords(arrayOfPRs[i], arrayOfKeywords)) {
					arrayOfPRsAddressingBugs.push(arrayOfPRs[i]);
				};
			};
			console.log("TOTAL ARRAY OF PRS ADDRESSING BUGS:", arrayOfPRsAddressingBugs);
		},
		arrayOfPRsAddressingBugs: arrayOfPRsAddressingBugs
	}

})