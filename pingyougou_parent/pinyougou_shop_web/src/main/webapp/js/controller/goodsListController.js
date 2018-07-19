 //控制层 
app.controller('goodsListController' ,function($scope,$controller ,goodsService,itemCatService){
	
	$controller('baseController',{$scope:$scope});//继承

	$scope.status=["未审核","审核通过","审核未通过","关闭"]
    $scope.maketStatus=["未启用","上架","下架"];
	//
    $scope.catagoryList={"1":"ab"};
    $scope.findAllCatagoryList=function () {
		itemCatService.findAll().success(function (response) {
            for (var i = 0; i < response.length; i++) {
                $scope.catagoryList[response[i].id]=response[i].name

            }
        })
    }

    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
        goodsService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}
	//商品上下架
   $scope.updateMarketable=function (markerketable) {
       goodsService.updateMarketable($scope.selectIds ,markerketable).success(function (response) {
            if(response.success){
                $scope.reloadList();//刷新列表
                $scope.selectIds=[]
            }else{
            	//提示失败信息
            	alert(response.message)
			}
        })
   }
	
	//分页
	$scope.findPage=function(page,rows){
        goodsService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){
        goodsService.findOne(id).success(
			function(response){
				$scope.entity= response;					
			}
		);				
	}
	
	//保存 
	$scope.save=function(){				
		var serviceObject;//服务层对象  				
		if($scope.entity.id!=null){//如果有ID
			serviceObject=goodsListService.update( $scope.entity ); //修改
		}else{
			serviceObject=goodsListService.add( $scope.entity  );//增加
		}				
		serviceObject.success(
			function(response){
				if(response.success){
					//重新查询 
		        	$scope.reloadList();//重新加载
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
        goodsService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
					$scope.reloadList();//刷新列表
				}						
			}		
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){
        goodsService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
    
});	
