import '../css/index.less';
import $ from 'jquery';
export Paging from './paging';
if(typeof(Paging) == 'undefined'){
    window.Paging = exports['Paging'];
}

//jquery插件导出
$.fn.extend({
    Paging:function(opt){
        Paging(opt,this);
        return this;
    }
});
