app.service("typeTemplateService", function ($http) {
    //查询规格项信息
    this.findSpecList=function (typeTemplateId) {
        return $http.get("../typeTemplate/findSpecList/"+typeTemplateId);
    }

    //查询所有
    this.findAll = function () {
        return $http.get("../typeTemplate/findAll");
    };
    //根据条件查询数据
    this.search = function (pageNum, pageSize, searchEntity) {
        return $http.post("../typeTemplate/search/" + pageNum + "/" + pageSize, searchEntity);
    };
    //添加数据
    this.add = function (entity) {
        return $http.post("../typeTemplate/add",entity);
    };
    this.update = function (entity) {
        return $http.post("../typeTemplate/update",entity);
    };
    //    修改参数
    this.findOne = function (id) {
        return $http.get("../typeTemplate/findOne/" + id);
    };
    //    删除数据
    this.dele = function (selectIds) {
        //判断selectIDs数组中的数据是否为空
        return $http.get("../typeTemplate/delete/"+selectIds);
    }
})