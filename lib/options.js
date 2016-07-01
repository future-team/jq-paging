'use strict';

exports.__esModule = true;
var options = {
  /**
   * 当前页
   * */
  currentPage: 1,
  /**
   * 每页展示条目数量
   * */
  pageSize: 5,
  /**
   * 总条目数量
   * */
  total: 20,
  /**
   * 页面显示的页数
   * */
  showNum: 5,
  /**
   * 插入分页的元素标记
   * */
  root: '#pages',
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
  clickCallBack: function clickCallBack(num) {}

};
exports['default'] = options;
module.exports = exports['default'];