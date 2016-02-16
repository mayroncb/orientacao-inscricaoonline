(function() {
    'use strict';

    angular
        .module('triangular.directives')
        .directive('capitalize', capitalize);

    /* @ngInject */
    function capitalize() {
        // Usage:
        //
        // ```html
        // <form name="signup">
        //     <input name="password" type="password" ng-model="user.password" same-password="signup.confirm" />
        //     <input name="confirm" type="password" ng-model="user.confirm" same-password="signup.confirm" />
        // </form>
        // ```
        // Creates:
        //
        // `samePassword` is a directive with the purpose to validate a password input based on the value of another input.
        // When both input values are the same the inputs will be set to valid

        var directive = {
          require: 'ngModel',
               link: function(scope, element, attrs, modelCtrl) {
                  var capitalize = function(inputValue) {
                     if(inputValue == undefined) inputValue = '';
                     var capitalized = inputValue.toUpperCase();
                     if(capitalized !== inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                      }
                      return capitalized;
                   }
                   modelCtrl.$parsers.push(capitalize);
                   capitalize(scope[attrs.ngModel]);  // capitalize initial value
               }
        };
        return directive;
    }
})();
