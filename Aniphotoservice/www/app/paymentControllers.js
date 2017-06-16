(function () {
    "use strict";

    angular.module("myapp.controllers")
        .controller("paymentCtrl", ["$scope", "$rootScope", function ($scope, $rootScope) {
            $scope.$on('$ionicView.enter', function () {
                console.log("_!4")
                $rootScope.bottomBarShow = true;
                $rootScope.leftButtonBar = true;
                $rootScope.rightButtonBar = false;
                $rootScope.activBool1 = true;
                $rootScope.activBool2 = true;
                $rootScope.activBool3 = true;
                $rootScope.activBool4 = true;
                $rootScope.loadingShow = false;
                
                $rootScope.leftButtonFunc = function () {
                    console.log($rootScope.activBool4)
                    if ($rootScope.activBool4) {
                        console.log($rootScope.activBool4)
                        $rootScope.activBool4 = false;
                        $rootScope.rightButtonBar = true;
                        location.href = "#/app/address";
                    }
                }
                $scope.$apply();
            })

        }])
})();