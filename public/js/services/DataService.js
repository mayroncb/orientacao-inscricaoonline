angular.module('app').service('dataService', function() {
  var dataList = [];

  var addData = function(newObj) {
      dataList.push(newObj);
  };

  var getDatas = function(){
      return dataList;
  };

  return {
      addData: addData,
      getDatas: getDatas
  };

});
