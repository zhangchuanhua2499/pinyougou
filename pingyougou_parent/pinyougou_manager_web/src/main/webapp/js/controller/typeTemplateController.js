app.controller("typeTemplateController",function ($scope, $controller,brandService,specificationService,typeTemplateService){
    $controller('baseController',{$scope:$scope});//继承

    $scope.entity={customAttributeItems:[]};
    //动态添加扩展属性
    $scope.addCustomAttributeItems=function () {
    $scope.entity.customAttributeItems.push({});
    }
    //优化页面
   $scope.arrayListToString=function(arrayList){
        var str ="";
       arrayList=JSON.parse(arrayList);
       for (var i = 0; i < arrayList.length; i++) {
           if(i==arrayList.length-1){
               str+=arrayList[i].text;
           }else {
               str+=arrayList[i].text+",";
           }
       }
       return str;
   }

    // 动态删除扩展属性
    $scope.delCustomAttributeItems=function (index) {
        $scope.entity.customAttributeItems.splice(index,1)
    }
    

    $scope.findBrandList=function () {
        brandService.findBrandList().success(function (reponse) {
            $scope.brandList={data:reponse}
        })
    }

   $scope.findSpecList=function () {
       specificationService.findSpecList().success(function (reponse) {
           $scope.specList={data:reponse}
       })
   }

    //根据条件查询数据
    $scope.search = function(pageNum,pageSize) {
        typeTemplateService.search(pageNum,pageSize,$scope.searchEntity).success(function (response) {
            //单前页数据
            $scope.list =response.rows;
            //总条数
            $scope.paginationConf.totalItems	=response.total;
        })
    };
    //查询所有
    $scope.findAll=function(){
      typeTemplateService.findAll().success(function (response) {
            $scope.list=response;
        })
    };
    var resultObject =null;
    //添加数据
    $scope.save= function () {
        if($scope.entity.id!=null){
            resultObject=typeTemplateService.update($scope.entity)
        }else {
            resultObject=typeTemplateService.add($scope.entity)
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
      typeTemplateService.findOne(id).success(function (response){
          response.specIds =JSON.parse(response.specIds);
          response.brandIds =JSON.parse(response.brandIds);
          response.customAttributeItems =JSON.parse(response.customAttributeItems);
            $scope.entity=response;
        })
    };

    //    删除数据
    $scope.dele=function () {
        //判断selectIDs数组中的数据是否为空
        if($scope.selectIds.length>0){
            if(window.confirm("确认删除选中参数")){
               typeTemplateService.dele($scope.selectIds).success(function(response){
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