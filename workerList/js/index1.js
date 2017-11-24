/**
 * Created by Administrator on 2017/11/22.
 */
var app = angular.module("myApp", []);
app.controller("myCtrl", function ($scope, $http) {
    $http({
        method: "GET",
        url: "./js/json/workers.json"
    }).then(function successCallback(response) {
        $scope.workers = response.data.workersList;
    }, function errorCallback(response) {
        $scope.workers = null;
    });
    
    $scope.userController = {
        list:[],
        info:{},
        state:"",
        get:function(){
            $http({
                method: "GET",
                url: "./js/json/workers.json"
            }).then(function successCallback(response) {
                this.workers = response.data.workersList;
            }.bind(this));
        },
        
        add:function(){
            this.state = "add";
            this.info = {};
            $('#modal1').modal('show');
            
        },
        modiy:function(index){
            this.state = "modiy";
            this.info = angular.copy(this.list[index])
        }

    }
    $scope.compnayController = {
        list:[],

    }

    //定义一个点击 新增 按钮时触发的事件，用于新增数据
    $scope.add = function () {
        $('#modal1').modal('show');
         //定义一个 新增 中点击 保存 按钮时触发的事件
        

    };

    $scope.save = function (){ 
        $scope.workers.push({ Name: $scope.newName, Sex:$scope.newSex, Job: $scope.newJob,Num: $scope.newNum,Dept: $scope.newDept });

        //关闭模块窗口
        $('#modal1').modal('hide');
        //清空输入框
        $scope.newName="";
        $scope.newSex="";
        $scope.newJob="";
        $scope.newNum="";
        $scope.newDept="";
    };

    //定义一个单击 修改 按钮时触发的事件，用于修改选中行

    $scope.modify = function ($index) {
        $('#modal2').modal('show');
        $scope.newName=angular.copy($scope.workers[$index].Name);
        $scope.newSex= $scope.workers[$index].Sex;
        $scope.newJob= $scope.workers[$index].Job;
        $scope.newNum=$scope.workers[$index].Num;
        $scope.newDept=$scope.workers[$index].Dept;

        //定义一个 修改 中点击 保存 按钮时触发的事件
        $scope.ensure = function (index){
            $scope.workers[$index].Name=$scope.newName;
            $scope.workers[$index].Sex=$scope.newSex;
            $scope.workers[$index].Job=$scope.newJob;
            $scope.workers[$index].Num=$scope.newNum;
            $scope.workers[$index].Dept=$scope.newDept;
            
            console.log($scope.newSex);
            //关闭模块窗口
            $('#modal2').modal('hide');
            //清空输入框
            $scope.newName="";
            $scope.newSex="";
            $scope.newJob="";
            $scope.newNum="";
            $scope.newDept="";
    };


    //定义一个点击取消按钮时触发的事件
      $scope.cancel=function(){
        //关闭模块窗口
        $('.ui.modal').modal('hide');
        //清空输入框
        $scope.newName="";
        $scope.newSex="";
        $scope.newJob="";
        $scope.newNum="";
        $scope.newDept="";
    };

    };


    //定义一个单击删除按钮时触发的事件，用于删除选中行
    $scope.remove = function ($index) {
        if ($index >= 0) {
            if (confirm("是否删除" + $scope.workers[$index].Name)) {
                $scope.workers.splice($index, 1);
            }
        }
    };

});



