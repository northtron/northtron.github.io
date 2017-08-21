
(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective () {
  var ddo = {
  templateUrl: 'founditems.html',
  scope: {
    found : '<',
    onRemove: '&'
  },
  controller: NarrowItDownDirectiveController,
  controllerAs: 'narrow', bindToController: true
  };

  return ddo;
}

function NarrowItDownDirectiveController()
{
  var narrow = this;

  narrow.showError =  function () {
    if (narrow.found !== undefined && narrow.found.length < 1) {
      return true; }
       else { return false; };
  }; 
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow = this;
  narrow.searchTerm = "";

  narrow.searchMenuItems = function () {
    if (narrow.searchTerm === "" ) {
      narrow.found = []; // clear the data in list
      return; // return empty string and end function
    }
    var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);

    promise.then(function(response) {
      narrow.found = response;
    }).catch(function(error) {
        console.log("ERROR ON PROMISE PULL", error);
      });
    };
  
    narrow.removeItem = function (index) {
      narrow.found.splice(index, 1);
    };
  }

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
  return $http({
          method: 'GET',
          url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
        }).then(function (result) {
        
        var menuItems = result.data.menu_items;

        var foundItems = [];

        for (var i = 0; i < menuItems.length; i++) {
          if (menuItems[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) {
            foundItems.push(menuItems[i]);
          }
        }


    return foundItems;
    });
  };
}

})();