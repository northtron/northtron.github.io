(function(){
"use strict";

angular.module('public')
.directive('dishCheck', dishCheck);

dishValidation.$inject = ['MenuService']

function dishCheck(MenuService) {
  var menu_items;
  var valid = false;
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, elem, attr, ngModel) {
      ngModel.$validators.dishCheck = function(modelValue, viewValue){
          if(!menu_items) {
              MenuService.getMenuItems().then(function(response) {
                  menu_items = response.menu_items;
              });
          }

          if(menu_items && modelValue) {
              menu_items.forEach(function(element, idx) {
                  if(element.short_name == modelValue) {
                      valid = true;
                  }
              });
          }

          return valid;
      };
    }
  };
}

})();