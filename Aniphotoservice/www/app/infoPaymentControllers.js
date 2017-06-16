(function () {
    "use strict";

    angular.module("myapp.controllers")
        .controller("infoPaymentCtrl", ["$scope", "$rootScope", "dataStorage", function ($scope, $rootScope, dataStorage) {
            $scope.$on('$ionicView.enter', function () {
                console.log("_!2")
                $rootScope.bottomBarShow = true;
                $rootScope.leftButtonBar = true;
                $rootScope.rightButtonBar = true;
                $rootScope.activBool1 = true;
                $rootScope.activBool2 = true;
                $rootScope.activBool3 = false;
                $rootScope.activBool4 = false;
                $rootScope.loadingShow = false;
                $scope.printQuantity = 0;
                $scope.countInfoItems1 = 0;
                $scope.countInfoItems2 = 0;
                $scope.countInfoItems3 = 0;
                $scope.countInfoItems4 = 0;
                $rootScope.rightButtonFunc = function () {
                    if (!$rootScope.activBool3) {
                        $rootScope.activBool3 = true;
                        location.href = "#/app/address";
                    } 
                }
                $rootScope.leftButtonFunc = function () {
                    if ($rootScope.activBool2 && !$rootScope.activBool3 && !$rootScope.activBool4) {
                        $rootScope.activBool2 = false;
                        $rootScope.leftButtonBar = false;
                        dataStorage.backInfoItemBool = true;
                        location.href = "#/app/galleryPage";
                    } 
                }
                $scope.quantityImg = dataStorage.infoItems.length;
                for (var i = 0; i < dataStorage.infoItems.length; i++) {
                    //console.log(dataStorage.infoItems[i].count)
                    $scope.printQuantity += dataStorage.infoItems[i].count
                    if (dataStorage.infoItems[i].type.name == "10 / 15") {
                        $scope.countInfoItems1 += dataStorage.infoItems[i].count
                    } else if (dataStorage.infoItems[i].type.name == "13 / 18"){
                        $scope.countInfoItems2 += dataStorage.infoItems[i].count
                    } else if (dataStorage.infoItems[i].type.name == "15 / 21") {
                        $scope.countInfoItems3 += dataStorage.infoItems[i].count
                    } else if (dataStorage.infoItems[i].type.name == "20 / 30") {
                        $scope.countInfoItems4 += dataStorage.infoItems[i].count
                    }
                }
                $scope.costCountInfoItems1 = $scope.countInfoItems1 * 80;
                $scope.costCountInfoItems2 = $scope.countInfoItems2 * 110;
                $scope.costCountInfoItems3 = $scope.countInfoItems3 * 170;
                $scope.costCountInfoItems4 = $scope.countInfoItems4 * 630;
                $scope.totalCost = $scope.costCountInfoItems1 + $scope.costCountInfoItems2 + $scope.costCountInfoItems3 + $scope.costCountInfoItems4
                console.log($scope.countInfoItems1 + " __ " + $scope.countInfoItems2 + " __ " + $scope.countInfoItems3 + " __ " + $scope.countInfoItems4)
                dataStorage.backInfoItem = dataStorage.infoItems
                console.log(dataStorage.infoItems)
                $scope.$apply();
            })
            
            
            
        }])
})();