app.controller("brandController",function ($scope, $controller,brandService){
    $controller('baseController',{$scope:$scope});//继承

    //根据条件查询数据
    $scope.search = function(pageNum,pageSize) {
        brandService.search(pageNum,pageSize,$scope.searchEntity).success(function (response) {
            //单前页数据
            $scope.list =response.rows;
            //总条数
            $scope.paginationConf.totalItems	=response.total;
        })
    };
    //查询所有
    $scope.findAll=function(){
      brandService.findAll().success(function (response) {
            $scope.list=response;
        })
    };
    var resultObject =null;
    //添加数据
    $scope.save= function () {
        if($scope.entity.id!=null){
            resultObject=brandService.update($scope.entity)
        }else {
            resultObject=brandService.add($scope.entity)
        }
       resultObject.success(function (response) {
            if(response.success){
                $scope.reloadList();
            }else {
                alert(response.message)
            }
        })
    };
    //    修改参数
    $scope.findOne=function (id) {
      brandService.findOne(id).success(function (response) {
            $scope.entity=response;
        })
    };

    //    删除数据
    $scope.dele=function () {
        //判断selectIDs数组中的数据是否为空
        if($scope.selectIds.length>0){
            if(window.confirm("确认删除选中参数")){
               brandService.dele($scope.selectIds).success(function(response){
                    if(response.success){
                        $scope.reloadList();
                        $scope.selectIds=[];
                    }else {
                        alert(response.message)
                    }
                })
            }
        }
    }
})