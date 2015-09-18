app.directive('animClass',function($route){
  return {
    link: function(scope, elm, attrs){
      var enterClass = $route.current.animate;
      elm.addClass(enterClass)
      scope.$on('$destroy',function(){
        elm.removeClass(enterClass)
        elm.addClass($route.current.animate)
      })
    }
  }
});
