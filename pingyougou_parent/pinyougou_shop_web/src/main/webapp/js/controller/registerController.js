app.controller("registerController",function ($scope,sellerService) {
    $scope.save=function () {
        sellerService.add($scope.entity).success(function (response){
            if(response.success){
                alert("提交成功,等待审核")
            }else {
                alert(response.message)
            }
        })
    }

})