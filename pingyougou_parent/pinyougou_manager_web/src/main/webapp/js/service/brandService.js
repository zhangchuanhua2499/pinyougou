app.service("brandService", function ($http) {
    this.findBrandList=function () {
        return $http.get("../brand/findBrandList");
    }
    //查询所有
    this.findAll = function () {
        return $http.get("../brand/findAll");
    };
    //根据条件查询数据
    this.search = function (pageNum, pageSize, searchEntity) {
        return $http.post("../brand/search/" + pageNum + "/" + pageSize, searchEntity);
    };
    //添加数据
    this.add = function (entity) {
        return $http.post("../brand/add",entity);
    };
    this.update = function (entity) {
        return $http.post("../brand/update",entity);
    };
    //    修改参数
    this.findOne = function (id) {
        return $http.get("../brand/findOne/" + id);
    };
    //    删除数据
    this.dele = function (selectIds) {
        //判断selectIDs数组中的数据是否为空
        return $http.get("../brand/dele/"+selectIds);
    }
})