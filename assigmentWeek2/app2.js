(function () {
'use strict';


angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListService', ShoppingListService);

ToBuyController.$inject = ['ShoppingListService'];
function ToBuyController(ShoppingListService) {
  var buy = this;

  buy.items = ShoppingListService.getItemsBuy();

  buy.removeItem = function (itemIndex) {
    ShoppingListService.removeItem(itemIndex);
  };
 
}

AlreadyBoughtController.$inject = ['ShoppingListService'];
function AlreadyBoughtController(ShoppingListService) {
  var bought = this;

  bought.items = ShoppingListService.getItemsBought();
 
 
}

function ShoppingListService() {
  var service = this;

  // List of shopping items
  var buyList = [
    {
      name: "Milk",
      quantity: "2"
    },
    {
      name: "Donuts",
      quantity: "200"
    },
    {
      name: "Cookies",
      quantity: "300"
    },
    {
      name: "Chocolate",
      quantity: "5"
    },
    {
      name: "Crisp",
      quantity: "10"
    }
  ];
  var boughtList =[];

  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    items.push(item);
  };

  service.removeItem = function (itemIndex) {
    var item = buyList[itemIndex];
    console.log(item);
    boughtList.push(item);
    buyList.splice(itemIndex, 1);
  };

  service.getItemsBuy = function () {
    return buyList;
  };

  service.getItemsBought = function () {
    return boughtList;
  };
}

})();
