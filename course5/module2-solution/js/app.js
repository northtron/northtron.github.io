
(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;



  //pre-populated to Buy List
    toBuyList.buyItems = ShoppingListCheckOffService.getBuyItems();

    toBuyList.moveToBought = function (item, itemIndex) {
        ShoppingListCheckOffService.moveItem(item, itemIndex);
    }
  
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtList = this;

    boughtList.boughtItems = ShoppingListCheckOffService.getBoughtItems();
  }

function ShoppingListCheckOffService() {
  var service = this;

  // EMPTY SHOPPING LIST BOUGHT LIST
  var boughtItems = [];
  // pre-populated to Buy Shopping List
  var buyItems = [ {name: "Packs of Cookies", quantity: 10}, {name: "Bags of Doritos", quantity: 5}, {name: "Avacadoes", quantity: 7}, 
  {name: "Limes", quantity: 3}, {name: "Garlic", quantity: 1}, {name: "Packages of Bacon", quantity: 4}, {name: "Bottles of Gatorade", quantity: 6} ];

  service.getBuyItems = function () {
    return buyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };

  service.moveItem = function (item, itemIndex) {
    buyItems.splice(itemIndex, 1); // remove from toBuyList
    boughtItems.push(item);  // add to boughtList
  };

}
  

})();