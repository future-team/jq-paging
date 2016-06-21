'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('../css/index.less');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _paging = require('./paging');

var _paging2 = _interopRequireDefault(_paging);

exports.Paging = _paging2['default'];

if (typeof Paging == 'undefined') {
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