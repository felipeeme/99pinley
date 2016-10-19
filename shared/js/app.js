var angular,
	console;

angular.module('masonryApp', ['wu.masonry']).
    controller('pinleyApp', function ($scope, $http) {

    $scope.bricks = [];
 
    $http.get('http://jsonplaceholder.typicode.com/photos').success(function(data){
        $scope.bricks = data;
    }, function(error){
        console.log(error);
    });

});