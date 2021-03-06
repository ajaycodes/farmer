
amazon.controller('farmerProfileController', function($scope, $http) {	
	$scope.hide_addProductForm=true;
	$scope.hide_updateProductForm=true;
	$scope.hideDisplayFarmerInfo = false;
	$scope.hideEditFarmerProfile = true;
	$scope.hide_productQtyValidation = true;

	$scope.editFarmerInfo= function(){
		$http({
			method : "GET",
			url : '/farmerEditProfileForm'
		}).success(function(data) {
			if(data.farmerEditProfileFormStatus === 200){
				$scope.hideDisplayFarmerInfo = true;
				$scope.hideEditFarmerProfile = false;
			}
		}).error(function(error) {});
	};

	$scope.saveFarmerInfo = function() {
		$http({
			method : "POST",
			url : '/editFarmerInfo',
			data : {
				"firstName" : $scope.firstName,
				"lastName" : $scope.lastName,
				"address" : $scope.address,
				"city" : $scope.city,
				"state" : $scope.state,
				"zipCode" : $scope.zipCode,
				"phoneNumber" : $scope.phoneNumber,
			}
		}).success(function(data){
			if (data.editFarmerInfoStatus === "EditFarmerInfoSuccesful") {
				$scope.hideDisplayFarmerInfo = false;
				$scope.hideEditFarmerProfile = true;
				window.location.assign("/farmerProfile");
			}}).error(function(error) {});
	};
	$scope.cancelFarmerInfoChanges = function() {
		$scope.hideDisplayFarmerInfo = false;
		$scope.hideEditFarmerProfile = true;
		$http({
			method : "GET",
			url : '/farmerProfile',
		}).success(function(data){}).error(function(error) {});
	};

	$scope.displayAddProductForm = function() {

		$http({
			method : "GET",
			url : '/displayAddProductForm'
		}).success(function(data) {		
			if(data.displayAddProductFormStatus == 200) {
				$scope.hide_addProductForm=false;
				$scope.hide_updateProductForm=true;
			}
		}).error(function(error) {

		});
	};

	$scope.addProduct = function() {		
		$http({
			method : "POST",
			url : '/addProduct',
			data : {
				"productName" : $scope.productName,
				"productPrice" : $scope.productPrice,
				"productDescription" : $scope.productDescription,
				"productQuantity" : $scope.productQuantity,
				"productCategory" : $scope.productCategory
			}
		}).success(function(data) {		
			if(data.addProductStatus == 200) {
				window.location.assign('/farmerProfile');
			}
			else if(data.addProductStatus == 404) {
				$scope.hide_productQtyValidation = false;
			}
		}).error(function(error) {

		});
	};

	$scope.cancelAddProduct = function() {

		$http({
			method : "GET",
			url : '/farmerProfile',
		}).success(function(data) {	
			window.location.assign('/farmerProfile');
		}).error(function(error) {

		});
	};

	$scope.deleteProductDetails =  function(productId) {	
		$http({
			method : "POST",
			url : '/deleteProductDetails',
			data : {
				"productId" : productId
			}
		}).success(function(data) {	
			if(data.deleteProductStatus === 200) {
				window.location.assign('/farmerProfile');
			}
		}).error(function(error) {});
	};

	$scope.displayUpdateProductForm =  function(productId,productName,productPrice,productQuantity,productDescription,productCategory) {	
		$http({
			method : "GET",
			url : '/displayUpdateProductForm',
			data : {
				"productId" : productId,
				"productName" : productName,
				"productPrice" : productPrice,
				"productQuantity" : productQuantity,
				"productDescription" : productDescription,
				"productCategory" : productCategory
			}
		}).success(function(data) {	
			if(data.displayUpdateProductFormStatus == 200) {
				$scope.hide_updateProductForm=false;
				$scope.hide_addProductForm=true;
				$scope.productId = productId;
				$scope.productName = productName;
				$scope.productPrice = Number(productPrice);
				$scope.productQuantity = Number(productQuantity);
				$scope.productDescription = productDescription;
				$scope.productCategory = productCategory;
			}
		}).error(function(error) {
		});
	};

	$scope.updateProduct = function() {		
		$http({
			method : "POST",
			url : '/updateProduct',
			data : {
				"productId" : $scope.productId,
				"productName" : $scope.productName,
				"productPrice" : $scope.productPrice,
				"productDescription" : $scope.productDescription,
				"productQuantity" : $scope.productQuantity,
				"productCategory" : $scope.productCategory
			}
		}).success(function(data) {		
			if(data.updateProductStatus == 200) {
				window.location.assign('/farmerProfile');
			}
			else if(data.updateProductStatus == 404) {
				$scope.hide_productQtyValidation = false;
			}
		}).error(function(error) {
		});
	};

	$scope.cancelUpdateProduct = function() {	
		$http({
			method : "GET",
			url : '/farmerProfile',
		}).success(function(data) {	
			window.location.assign('/farmerProfile');
		}).error(function(error) {

		});
	};

	$scope.deleteFarmer=function(req,res){
		$http({
			method : "POST",
			url : '/deleteFarmer',
		}).success(function(data) {		
			if(data.deleteFarmerStatus == "deletedFarmer") {
				window.location.assign('/');
			}
		}).error(function(error) {
		});
	};

})
