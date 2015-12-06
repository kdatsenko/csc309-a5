var crudApp = angular.module('crudApp');

crudApp.controller('userController', function ($scope, $http, $location, $timeout) {

	$scope.mySortFunction = function(item) {
			if(isNaN(item[$scope.sortExpression]))
				return item[$scope.sortExpression];
			return parseInt(item[$scope.sortExpression]);
		}

		$http({
			method:'GET',
			url: '/users'
		}).then(function successCallback(res) {
			$scope.userList = res.data;

		}, function errorCallback(res) {
			console.log(res.data.error);
		});

		 $scope.getUser = function (username) {
		 	$location.path('/profile/' + username);
		 };


	 $scope.deleteUser = function (id) {
	 	$http({
	 		method: 'DELETE',
	 		url: '/users/profile/' + id
	 	}).then(function successCallback(res) {
 			for (var i = 0; i < $scope.userList.length; i++) {
	 			if ($scope.userList[i]._id == id) {
	 				$scope.userList.splice(i, 1);
	 			}
 			};
 			$scope.showMsg = true;
			$scope.msg = res.data.message;
			$timeout(function() {
				$scope.showMsg = false;
			}, 3000);


	 	}, function errorCallback(res) {
	 		$scope.showMsg = true;
			$scope.msg = res.data.error;
			$timeout(function() {
				$scope.showMsg = false;
			}, 3000);
	 	});
	 };
});
