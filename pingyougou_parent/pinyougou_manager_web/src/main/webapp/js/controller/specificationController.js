app.controller("specificationController",function ($scope, $controller,specificationService){
    $controller('baseController',{$scope:$scope});//继承

    //增加一行动态添加框

    $scope.entity={specificationOptionsList:[]};

    $scope.addSpecificationOptionsList=function() {

        $scope.entity.specificationOptionsList.push({})
    };
    //删除一行动态添加框
    $scope.delespecificationOptionsList=function (index) {
        $scope.entity.specificationOptionsList.splice(index,1);
    };

    //根据条件查询数据
    $scope.search = function(pageNum,pageSize) {
        specificationService.search(pageNum,pageSize,$scope.tbSpecification).success(function (response) {
            //单前页数据
            $scope.list =response.rows;
            //总条数
            $scope.paginationConf.totalItems	=response.total;
        })
    };
    //查询所有
    $scope.findAll=function(){
        specificationService.findAll().success(function (response) {
            $scope.list=response;
        })
    };
    var resultObject =null;
    //添加数据
    $scope.save= function () {
        if($scope.entity.tbSpecification.id!=null){
            resultObject=specificationService.update($scope.entity)
        }else {
            resultObject=specificationService.add($scope.entity)
        }
       resultObject.success(function (response) {
            if(response.success){
                // $scope.findAll();
                $scope.reloadList();
            }else {
                alert(response.message)
            }
        })
    };
    //    修改参数
    $scope.findOne=function (id) {
        specificationService.findOne(id).success(function (response) {
            $scope.entity=response;
        })
    };

    //    删除数据
    $scope.dele=function () {
        //判断selectIDs数组中的数据是否为空
        if($scope.selectIds.length>0){
            if(window.confirm("确认删除选中参数")){
                specificationService.dele($scope.selectIds).success(function(response){
                    if(response.success){
                        // $scope.findAll();
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