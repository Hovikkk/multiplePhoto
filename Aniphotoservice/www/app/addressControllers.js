(function () {
    "use strict";

    angular.module("myapp.controllers")
        .controller("addressCtrl", ["$scope", "$rootScope", function ($scope, $rootScope) {
            $scope.userdata = {
                name: "",
                phone: "",
                address: "",
                optionSelect: "",
                state: "gyumri"
            }
            $scope.filterCondition = {
                operator: 'gyumri'
            }

            $scope.operators = [
                {
                    value: 'gyumri',
                    displayName: 'Շիրակ'
                },
                {
                    value: 'erevan',
                    displayName: 'Երևան'
                },
                {
                    value: 'aragacotn',
                    displayName: 'Արագածոտն'
                },
                {
                    value: 'ararat',
                    displayName: 'Արարատ'
                },
                {
                    value: 'armavir',
                    displayName: 'Արմավիր'
                },
                {
                    value: 'gexarquniq',
                    displayName: 'Գեղարքունիք'
                },
                {
                    value: 'kotayq',
                    displayName: 'Կոտայք'
                },
                {
                    value: 'lori',
                    displayName: 'Լոռի'
                },

                {
                    value: 'syuniq',
                    displayName: 'Սյունիք'
                },
                {
                    value: 'tavush',
                    displayName: 'Տավուշ'
                },
                {
                    value: 'vayocDzor',
                    displayName: 'Վայոց ձոր'
                }
            ]
            $rootScope.rightButtonFunc = function () {
                if (!$rootScope.activBool4) {


                    if ($rootScope.rightButtonBar) {
                        $rootScope.activBool4 = true;
                        $rootScope.rightButtonBar = false;
                        location.href = "#/app/payment";
                    }
                }
            }
            $rootScope.leftButtonFunc = function () {
                if ($rootScope.activBool3 && !$rootScope.activBool4) {
                    $rootScope.activBool3 = false;
                    location.href = "#/app/infoPayment";
                }
            }
            $scope.phoneError = false;
            $scope.phoneNumbr;
            $scope.inputNameNull = false
            $rootScope.bottomBarShow = true;
            $rootScope.leftButtonBar = true;
            $rootScope.rightButtonBar = false;
            $rootScope.activBool1 = true;
            $rootScope.activBool2 = true;
            $rootScope.activBool3 = true;
            $rootScope.activBool4 = false;
            $rootScope.loadingShow = false;
            $scope.$on('$ionicView.enter', function () {
                $scope.phoneError = false;
                $scope.phoneNumbr = /^\+374?\d{8}$/;
                $scope.inputNameNull = false
                $rootScope.bottomBarShow = true;
                $rootScope.leftButtonBar = true;
                $rootScope.rightButtonBar = false;
                $rootScope.activBool1 = true;
                $rootScope.activBool2 = true;
                $rootScope.activBool3 = true;
                $rootScope.activBool4 = false;
                $rootScope.loadingShow = false;
                
                
            })
            $scope.region = function (e) {
                console.log(e)
            }
            $scope.userInfo = function (){
                console.log($scope.userdata)
            }
            $scope.fin = function () {
                console.log($scope.userdata)
                if (($scope.userdata.name != '') && ($scope.userdata.phone != '') && ($scope.userdata.phone != undefined) && ($scope.userdata.optionSelect != '') && ($scope.userdata.address != '')) {
                    $rootScope.rightButtonBar = true;
                } else {
                    $rootScope.rightButtonBar = false;
                }
                if ($scope.userdata.phone == undefined) {
                    $scope.phoneError = true;
                } else {
                    $scope.phoneError = false;
                }
            }
        }])
})();