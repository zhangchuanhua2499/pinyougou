app.controller("goodsController", function ($scope, goodsService, itemCatService, typeTemplateService, uploadService) {
    //初始化定义itemImages定义为一个数组
    $scope.entity = {tbGoodsDesc: {itemImages: [],specificationItems:[]},tbGoods:{isEnableSpec:'1'}};
    $scope.entity.tbItems=[];
    $scope.addImageToItemImage = function () {
        $scope.entity.tbGoodsDesc.itemImages.push($scope.image);
    }

    //图片上传
    $scope.uploadFile = function () {
        uploadService.uploadFile().success(function (response) {
            if (response.success) {
                $scope.image.url = response.message;
            } else {
                alert(response.message)
            }
        })
    };


    $scope.save = function () {
        $scope.entity.tbGoodsDesc.introduction = editor.html();
        goodsService.add($scope.entity).success(function (response) {
            if (response.success) {
                location.href = "goods.html"
            } else {
                alert(response.message)
            }
        })
    }


    $scope.findItemCategoty1List = function () {
        itemCatService.findByParentId(0).success(function (response) {
            $scope.itemCategoty1List = response;
        })
    }
// 检测第一个参数是检测的数据，newValue改变后的ID值，oldValue改变前de ID
    $scope.$watch("entity.tbGoods.category1Id", function (newValue, oldValue) {
        itemCatService.findByParentId(newValue).success(function (response) {
            $scope.itemCategoty2List = response;
            $scope.itemCategoty3List = [];//
            $scope.entity.tbGoods.typeTemplateId=null;
        })
    })
    $scope.$watch("entity.tbGoods.category2Id", function (newValue, oldValue) {
        itemCatService.findByParentId(newValue).success(function (response) {
            $scope.itemCategoty3List = response;
            $scope.entity.tbGoods.typeTemplateId=null;
        })
    })
    //监控三级分类，查询出模板的Id
    $scope.$watch("entity.tbGoods.category3Id", function (newValue, oldValue) {
        itemCatService.findOne(newValue).success(function (response) {
            $scope.entity.tbGoods.typeTemplateId = response.typeId;
            //此为清空规格小项数据
            $scope.entity.tbItems=[];
        })
    })
//监控三级分类，查询出所有品牌
    $scope.$watch("entity.tbGoods.typeTemplateId", function (newValue, oldValue) {
        typeTemplateService.findOne(newValue).success(function (response) {
            $scope.brandList = JSON.parse(response.brandIds);//某模板下的品牌
           $scope.entity.tbGoodsDesc.customAttributeItems=JSON.parse(response.customAttributeItems)
            //custom_attribute_items
        })


        typeTemplateService.findSpecList(newValue).success(function (response) {
            $scope.specList=response;
        })
    })
    $scope.updateSpecificationItems=function ($event, specName,optionName) {
        if($event.target.checked){
     var fromList=selectObjectFromList($scope.entity.tbGoodsDesc.specificationItems,specName)
        if(fromList!=null){
         fromList.attributeValue.push(optionName)
        }else {
            $scope.entity.tbGoodsDesc.specificationItems.push({attributeName:specName,attributeValue:[optionName]})
        }
    }else{
            var arrList=selectObjectFromList($scope.entity.tbGoodsDesc.specificationItems,specName);
           var index =arrList.attributeValue.indexOf(optionName);
            arrList.attributeValue.splice(index,1);
            if(arrList.attributeValue.length==0){
                var index1 =  $scope.entity.tbGoodsDesc.specificationItems.indexOf(specName)
                $scope.entity.tbGoodsDesc.specificationItems.splice(index1,1)
            }
        }
        createtbItems();

    }
    function createtbItems() {
        //初始化规格小项数据
        $scope.entity.tbItems=[{spec:{},price:'0',num:'9999',status:'1',isDefault:'1'}];
        //[{"attributeName":"网络","attributeValue":["移动3G"]},{"attributeName":"机身内存","attributeValue":["16G"]}]
        var specItems=$scope.entity.tbGoodsDesc.specificationItems;
        for (var i = 0; i < specItems.length; i++) {
            // {"attributeName":"网络","attributeValue":["移动3G"]}
            $scope.entity.tbItems=addColumn($scope.entity.tbItems,specItems[i].attributeName,specItems[i].attributeValue)
        }
    }
    function addColumn(tbItems,attributeName,attributeValue) {
        var newList=[];
        //循环{"attributeName":"网络","attributeValue":["移动3G"]}
        for (var i = 0; i < tbItems.length; i++) {
            //循环"attributeValue":["移动3G"]
            for (var j = 0; j < attributeValue.length; j++) {
                //得到[{spec:{},price:'0',num:'9999',status:'1',isDefault:'1'}]
                var newItems=JSON.parse(JSON.stringify(tbItems[i]));
                newItems.spec[attributeName]=attributeValue[j];
                newList.push(newItems)
            }
        }
        return newList;
    }

    function selectObjectFromList(specificationItems,specName) {
        for (var i = 0; i < specificationItems.length; i++) {
            var obj = specificationItems[i];
            if(obj.attributeName==specName){
                return specificationItems[i];
            }
        }
        return null;
    }



    
})