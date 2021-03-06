var crudApp = angular.module('crudApp');

crudApp.controller('interestController', function ($scope, $http, $location, $timeout) {

	$scope.mySortFunction = function(item) {
			if(isNaN(item[$scope.sortExpression]))
				return item[$scope.sortExpression];
			return parseInt(item[$scope.sortExpression]);
	};

	$scope.showMsg = false;

	$http({
		method:'GET',
		url: '/interests'
	}).then(function successCallback(res) {
		$scope.interestList = res.data;

	}, function errorCallback(res) {
		console.log(res.data.error);
	});

	$scope.submitInterest = function (interest) {
		if ($scope.interest.name == undefined) {
			$scope.showMsg = true;
			$scope.msg = "Please fill the blank";
			$timeout(function() {
				$scope.showMsg = false;
			}, 3000);
		} else {
			$http({
				method: 'POST',
				url: '/interests/addnew',
				data: interest
			}).then(function successCallback(res) {
				$http({
					method:'GET',
					url: '/interests'
				}).then(function successCallback(res) {
					$scope.interestList = res.data;

				}, function errorCallback(res) {
					console.log(res.data.error);
				});

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
		}
	};

	$scope.deleteInterest = function (name) {
		$http({
			method: 'DELETE',
			url: '/interests/interest/name'
		}).then(function successCallback(res) {
			for (var i = 0; i < $scope.interestList.length; i++) {
	 			if ($scope.interestList[i].name == name) {
	 				$scope.interestList.splice(i, 1);
	 			}
				$scope.showMsg = true;
				$scope.msg = res.data.message;
				$timeout(function() {
					$scope.showMsg = false;
				}, 3000);
			}
		}, function errorCallback(res) {
			$scope.showMsg = true;
			$scope.msg = res.data.error;
			$timeout(function() {
				$scope.showMsg = false;
			}, 3000);
		});
	};

});
