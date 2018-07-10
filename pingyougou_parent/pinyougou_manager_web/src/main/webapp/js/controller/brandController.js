
aee.controller("brandController",function ($scope,brandService){
    // $controller('baseController',{$scope:$scope});//继承
    //分页控件配置
    $scope.paginationConf = {
        currentPage: 1, //当前页
        totalItems: 10,//总条数
        itemsPerPage: 10,//每页显示条数
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function(){
            $scope.reloadList();//重新加载
        }
    };
    $scope.searchEntity={};
    $scope.reloadList=function () {
        // $http.get("../brand/findPage/"+$scope.paginationConf.currentPage+"/"+$scope.paginationConf.itemsPerPage).success(function (response) {
        //     //单前页数据
        //     $scope.list =response.rows;
        //     //总条数
        //     $scope.paginationConf.totalItems	=response.total;
        // })
        $scope.search($scope.paginationConf.currentPage,$scope.paginationConf.itemsPerPage)
    };


    $scope.selectIds=[];
    $scope.updateSelection =function($event,id) {
        //判断是否选中，选中的话，把id放到selectIds数组中
        if($event.target.checked){
            //往数组中添加数据
            $scope.selectIds.push(id);
        }else {
            //查询到id在数组中索引的位置
            var ad = $scope.selectIds.indexOf(id);
            //从数组中移除数据splice(移除数据在数组中的位置,移除的数量)
            $scope.selectIds.splice(ad,1);
        }
    };
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