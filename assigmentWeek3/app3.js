(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController',NarrowItDownController)
//.factory('ShoppingListFactory', ShoppingListFactory)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItems)
.directive('listItem',ListItem)
.directive('shoppingList', ShoppingList);

function ShoppingList() {
  var ddo = {
    templateUrl: 'shoppingList.html',
    scope: {
      list:'=myList',
      //items: '<',
      //title: '@title'
    }
    /*,
    controller: ShoppingListDirectiveController,
    controllerAs: 'c1',
    bindToController: true
    */
  };
  return ddo;
}

function ShoppingListDirectiveController() {
  var c1 = this;

  c1.cookiesInList = function () {
    for (var i = 0; i < c1.items.length; i++) {
      var name = items.found[i].name;
      if (name.toLowerCase().indexOf("cookie") !== -1) {
        return true;
      }
    }

    return false;
  };
}


function ListItem() {
  var ddo = {
    restrict: "AE",
    templateUrl: 'listItem.html'
  };
  return ddo;
}

function FoundItems() {
  var ddo = {
    template: '{{item.short_name}}, {{item.name}},{{item.description}}'
  };
  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var c1 = this;
  c1.search ="";
  var origTitle = "Search Result";
  c1.title = "";
  var test = [];
  c1.found = [];
  
  c1.findItems2 = function () {
    console.log(c1.search.length);
    if (c1.search.length>0) {
      c1.found = MenuSearchService.getMatchedMenuItems2(c1.search);
    }
    
    console.log("length is " + c1.found.length);
    c1.title = origTitle + "(" + c1.found.length + "Found )";
  }

  c1.findItems = function () {
    console.log(c1.search);
    if (c1.search.length>0) {
      test = MenuSearchService.getMatchedMenuItems(c1.search);
      console.log("test=" + test);
      c1.found = MenuSearchService.getSelectItem();
    }  
    console.log("length is " + c1.found.length);
    c1.title = origTitle + "(" + c1.found.length + "Found )";
  }
 

  c1.removeItem= function (index) {
    MenuSearchService.removeItem(index);
    c1.title = origTitle + "(" + c1.found.length + "Found )";
  }
  
}
MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  
  var service = this;
  var items = [];
  var items2 = 
    {"menu_items":[
      {id:877,short_name:'A1',name:'Won Ton Soup with Chicken',
        description:'chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions',
        price_small:2.55,price_large:5.0,small_portion_name:'pint',large_portion_name:'quart'},
      {id:878,short_name:'A2',name:'Egg Drop Soup',
      description:'chicken broth with egg drop',price_small:2.25,price_large:4.5,small_portion_name:'pint',
      large_portion_name:'quart'}]}

  /*    
  service.getMatchedMenuItems = function (key) {
    //return items2["menu_items"];
  }
  */
  service.removeItem = function(itemIndex) {
    items.splice(itemIndex, 1);
  }

  service.getMatchedMenuItems = function (keyword) {
    
    var promise = getItems();
    promise.then( function success(response) {
      //menu.categories = response.data;
      //console.log(menu.categories);
      //var allmenu = menu.categories['menu_items'];
      /*
      for (var item of response.data['menu_items']) {
        
        if (item.description.indexOf(keyword) !== -1) {
          items.push(item);
          
          console.log(item.description);
        };
      }*/
      console.log(keyword);
      items.length =0;
      response.data['menu_items'].filter(function (item) {
        if (item.description.indexOf(keyword) !== -1) {
          console.log(item.description);
          items.push(item);
        };
      });
      
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
    return  items;
  };

  service.getMatchedMenuItems2 = function (keyword) {
    return $http({
      method: "GET",
      
      url: (ApiBasePath + "/menu_items.json"),
      }).then(function success (response) {
      // process result and only keep items that match
      
      var foundItem =[];
      response.data['menu_items'].filter(function (item) {
        if (item.description.indexOf(keyword) !== -1) {
          console.log(item.description);
          foundItem.push(item);
          return item;
        };
      });
  
      // return processed items
      console.log(foundItem.length);
      return foundItem;
    })
  };
  
  function getItems() {
    var response = $http({
      method: "GET",
      //url: (ApiBasePath + "/categories.json")
      url: (ApiBasePath + "/menu_items.json"),
    });
    return response;
  }
  service.getSelectItem = function () {
    return items;
  };
}



})();
