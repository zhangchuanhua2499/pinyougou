app.controller("baseController",function ($scope) {
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
});