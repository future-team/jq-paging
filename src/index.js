import '../css/index.less';
import $ from 'jquery';
export Paging from './paging';
if(typeof(Paging) == 'undefined'){
    window.Paging = exports['Paging'];
}

//jquery插件导出
/*
$.fn.extend({
    paging:function(opt){
        paging(this,opt);

        return this;
    }
});*/
