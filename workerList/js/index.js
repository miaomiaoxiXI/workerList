/**
 * Created by Administrator on 2017/11/22.
 */
var app = angular.module("myApp", []);
app.controller("myCtrl", function ($scope, $http,$filter) {
    $scope.user = {
        workers: [],  //存放页面展示的数据
        info: {},
        state: "",    //区分新增和修改的状态
        index: "",
        keyword: "",
        searchData:"",

        search: function (e) {
            if (e.keyCode == 13) {//触发enter键盘事件
                this.get();
            }
        },

        
        get:function(){ 
            var searchData = this.getSearchData();
            if(!searchData) return;
            $http.get("./js/json/workers.json",{
                params:searchData
            }).success(function (data) {
                this.dealSearchData(data.workersList);
            }.bind(this));         
        },

        getSearchData: function () {
            var data = {
                keyword: this.keyword,
                time:new Date().getTime()
            }
            if (/[0-9]/.test(this.keyword)) {
                alert("不能输入数字");
                return false;
            }
            this.searchData = data;
            return data;
        },

        //数据处理
        dealSearchData: function (data) {
            this.workers = $filter('filter')(data, this.searchData.keyword)
        },

        add: function () {
            this.state = "add";
            this.info = {};
            $('#modal1').modal('show');

        },

        modify: function ($index) {
            this.index = $index;
            this.state = "modfiy";
            this.info = angular.copy(this.workers[$index]);
            $('#modal1').modal('show');
        },

        save: function () {
            this.state == 'add' ? this.workers.push(this.info) : this.workers[this.index] = this.info;
            $('#modal1').modal('hide');
            this.info = {}

        },


        cancel: function () {
            $('.ui.modal').modal('hide');
            this.info = {};

        },

        delete: function ($index) {
            if ($index >= 0) {
                if (confirm("是否删除" + this.workers[$index].Name)) {
                    this.workers.splice($index, 1);
                }
            }
        },

        

    }
    $scope.user.get();
});



