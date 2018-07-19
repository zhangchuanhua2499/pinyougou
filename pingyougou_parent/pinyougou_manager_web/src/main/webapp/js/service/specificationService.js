app.service("specificationService", function ($http) {

    this.findSpecList=function () {
        return $http.get("../specification/findSpecList");
    }

    //查询所有
    this.findAll = function () {
        return $http.get("../specification/findAll");
    };
    //根据条件查询数据
    this.search = function (pageNum, pageSize,tbSpecification) {
        return $http.post("../specification/search/" + pageNum + "/" + pageSize,tbSpecification);
    };
    //添加数据
    this.add = function (entity) {
        return $http.post("../specification/add",entity);
    };
    this.update = function (entity) {
        return $http.post("../specification/update",entity);
    };
    //    修改参数
    this.findOne = function (id) {
        return $http.get("../specification/findOne/" + id);
    };
    //    删除数据
    this.dele = function (selectIds) {
        //判断selectIDs数组中的数据是否为空
        return $http.get("../specification/dele/"+selectIds);
    }
})