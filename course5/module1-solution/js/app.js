
(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.menuItems = "";
  $scope.lunchMessage = "";
  $scope.msgClass = "black";
  $scope.txtBorder = "";

  
  $scope.checkLunchItems = function () {
  	var itemText = $scope.menuItems;
  	if (itemText === "") {
  		$scope.lunchMessage = "Please enter data first!";
  		$scope.msgClass = "red";
  		$scope.txtBorder = "red-border";
  	} else {
  		// split the input into an array, and continue processing
  		var items = itemText.split(',');

  		// BELOW CODE IS FOR the Optional part of the assignment, IGNORING BLANK INPUTS
  		// THIS FOR LOOP WILL TRIM EACH VALUE IN THE ARRAY to remove leading and trailing spaces
  	 	for (var i = 0; i < items.length; i++) {
 		    items[i] = items[i].trim();
 		}
 		// this line will remove any array value that does not evaluate as a Boolean == true (ie. blanks)
 		items = items.filter(Boolean);

  		// Check the array.length for a count of how many items, and send messages accordingly and change colors of elements
  		// need to double check for an empty array in case "" or undefined
  		if (items.length == undefined || items.length === 0) { 
			$scope.lunchMessage = "Please enter data first, empty records are not counted!";
	  		$scope.msgClass = "red";
	  		$scope.txtBorder = "red-border";
  		} else {
  			$scope.msgClass = "green";
  			$scope.txtBorder = "green-border";

  			if (items.length > 3) { // check item count and display proper message
  				$scope.lunchMessage = "Too Much!";
  			} else {
  				$scope.lunchMessage = "Enjoy!";
  			}
  		}
  		
  	}
  };
}

})();