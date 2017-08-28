(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);


RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  // Home page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menuapp/templates/category.template.html',
    controller: 'CategoryListController as catList',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })
  .state("items", {
      url: "/categories/{categoryShortName}/items",
      templateUrl: "src/menuapp/templates/menuitems.template.html",
      controller: "MenuItemsController as menuItems",
      resolve: {
        items: ["MenuDataService", "$stateParams", function (MenuDataService, $stateParams) {
          return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
        }]
      }
    });

  }

})();