app.controller("indexController",function ($scope,userService) {

    $scope.userController=function () {
        userService.userController().success(function(response) {
           response =JSON.parse(response);
            $scope.userName=response;
        })
    }
})