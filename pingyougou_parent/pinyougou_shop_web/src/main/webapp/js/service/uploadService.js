app.service("uploadService",function ($http) {
    this.uploadFile=function () {

        var formData=new FormData();//html5的对象
        formData.append("file",file.files[0]);//file.files[0] js file 看做document 中的文件
       return $http({
            method:'post',
            url:'../upload/uploadFile',
            data:formData,
           headers: {'Content-type':undefined},  // 相当于multipart/form-data
           transformRequest: angular.identity
        })

    }
});