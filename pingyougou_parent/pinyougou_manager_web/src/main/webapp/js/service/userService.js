app.service("userService",function ($http) {
    this.userController=function(){
       return $http.get("../Controller/userName");
    };
})