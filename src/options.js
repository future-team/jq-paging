let options = {
    /**
     * 当前页
     * */
    currentPage:1,
    /**
     * 每页展示条目数量
     * */
    pageSize:5,
    /**
     * 总条目数量
     * */
    total:20,
    /**
     * 页面显示的页数
     * */
    showNum: 5,
    /**
     * 插入分页的元素标记
     * */
    root:'#pages',
    /**
     * 是否显示提示,默认显示
     * */
    showTip: true,
    /**
     * tip是否显示在左边，true为左false为右，默认为true
     * */
    leftTip: true,
    /**
     * 点击回调事件
     * 返回参数为要显示的页数
     * */
    clickCallBack: function(num){

    },
    /**
     * 动态改变配置项参数
     * */
    setOpts:function(opts){},
    /**
     * 是否同步分页，即通过url整体刷新即后端分页
     * */
    isLink: false,
    /**
     * 配置link参数
     * */
    linkOpts:{
        /**
         * 基本url,不指定默认location.href
         * */
        baseUrl:location.href,
        /**
         * 每次需要根据页数改变的key
         * 例如page = 1 每次更改page。
         * */
        key:'page'
    }

};
export default options;
