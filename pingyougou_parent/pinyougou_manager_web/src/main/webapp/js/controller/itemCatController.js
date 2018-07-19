 //控制层 
app.controller('itemCatController' ,function($scope,typeTemplateService,itemCatService){

	$scope.findByParentId=function (parentId) {
		itemCatService.findByParentId(parentId).success(function (respose) {
			$scope.findList=respose;
        })
    }
    //记录当前数据的级别
    $scope.grade=1;

	$scope.entity1=null;
	$scope.entity2=null;
		$scope.parentId=0;
	$scope.setGrade=function (grade,pojo) {
    $scope.parentId=pojo.id;
        $scope.grade=grade;
		if(grade==1){
            $scope.entity1=null;
            $scope.entity2=null;
		}
        if(grade==2){
            $scope.entity1=pojo;
            $scope.entity2=null;
		}
		if(grade==3){
            $scope.entity2=pojo;
		}

    }
$scope.findTypeTemplate=function () {
	typeTemplateService.findAll().success(function(response) {
		$scope.typeTemplateList=response;
    })
}


    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		itemCatService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		itemCatService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){				
		itemCatService.findOne(id).success(
			function(response){
				$scope.entity= response;					
			}
		);				
	}
	
	//保存 
	$scope.save=function(){				
		var serviceObject;//服务层对象
		$scope.entity['parentId']=$scope.parentId;
		if($scope.entity.id!=null){//如果有ID
			serviceObject=itemCatService.update( $scope.entity ); //修改  
		}else{
			serviceObject=itemCatService.add( $scope.entity  );//增加 
		}				
		serviceObject.success(
			function(response){
				if(response.success){
					//重新查询 
                    $scope.findByParentId($scope.parentId);//重新加载
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		itemCatService.dele( $scope.selectIds ).success(
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
		itemCatService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
    
});	
