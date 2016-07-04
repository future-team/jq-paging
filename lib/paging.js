'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _optionsJs = require('./options.js');

var _optionsJs2 = _interopRequireDefault(_optionsJs);

var _templatePagesHtml = require('../template/pages.html');

var _templatePagesHtml2 = _interopRequireDefault(_templatePagesHtml);

var Pagination = (function () {
    function Pagination(options) {
        _classCallCheck(this, Pagination);

        this.opts = _jquery2['default'].extend({}, _optionsJs2['default'], options);
        //插入标记位
        this.root = _jquery2['default'](this.opts.root);
        this.renderPagination();
        this.bindEvents();
    }

    /**
     * 获取分页列表
     * */

    Pagination.prototype.renderPagination = function renderPagination() {
        this.opts.pageNum = this.getPageNum();
        this.opts.showPages = this.getShowPage(this.opts.pageNum);
        this.opts.root && this.renderHtml();
    };

    /**
     * 渲染页面
     * */

    Pagination.prototype.renderHtml = function renderHtml() {
        var pages = _templatePagesHtml2['default'](this.opts);
        this.root.html(pages);
    };

    /**
     * 获取页数
     * */

    Pagination.prototype.getPageNum = function getPageNum() {
        return Math.ceil(this.opts.total / this.opts.pageSize);
    };

    /**
     * 获取显示的页数
     * */

    Pagination.prototype.getShowPage = function getShowPage(pageNum) {
        var showNum = this.opts.showNum;
        var addIndex = parseInt(showNum / 2);
        var endIndex = showNum,
            startIndex = 1,
            pages = [];
        var currentPage = this.opts.currentPage;
        currentPage > 1 && pages.push({ type: 'text', val: '上一页' });
        if (currentPage <= showNum) {
            if (pageNum <= showNum) {
                endIndex = pageNum;
            }
        } else {
            pages.push({
                type: 'num',
                val: '1'
            }, {
                type: 'text',
                val: '...'
            });
            if (currentPage > showNum && currentPage < pageNum - addIndex) {
                endIndex = currentPage + addIndex;
                startIndex = currentPage - addIndex;
            } else if (currentPage <= pageNum) {
                endIndex = pageNum;
                startIndex = pageNum - showNum;
            }
        }
        var curr = false;
        for (var i = startIndex; i <= endIndex; i++) {
            if (currentPage == i) {
                curr = true;
            } else {
                curr = false;
            }
            pages.push({
                cur: curr,
                type: 'num',
                val: i
            });
        }
        pageNum > showNum && currentPage < pageNum - addIndex && pages.push({ type: 'text', val: '...' }, {
            type: 'num',
            val: pageNum
        });
        currentPage < pageNum && pages.push({ type: 'text', val: '下一页' });
        return pages;
    };

    /**
     * 前往第n页
     * */

    Pagination.prototype.goToPage = function goToPage(num) {
        this.opts.currentPage = num;
        this.renderPagination();
        this.opts.clickCallBack && this.opts.clickCallBack(num);
    };

    /**
     * 上一页或者下一页
     * true为下一页
     * */

    Pagination.prototype.nextPrev = function nextPrev(flag) {
        var num = flag ? this.opts.currentPage + 1 : this.opts.currentPage - 1;
        this.goToPage(num);
    };

    /**
     * 不同提示处理
     * */

    Pagination.prototype.tipHandler = function tipHandler(target, type) {
        switch (type) {
            case '下一页':
                this.nextPrev(true);
                break;
            case '上一页':
                this.nextPrev(false);
                break;
            default:
                break;
        }
    };

    Pagination.prototype.bindEvents = function bindEvents() {
        var _this = this.root,
            that = this;
        _this.on('click', 'a[data-type="num"]', function (e) {
            e.preventDefault();
            var _this = _jquery2['default'](e.target);
            var num = parseInt(_this.text());
            that.goToPage(num);
        });
        _this.on('click', 'a[data-type="text"]', function (e) {
            e.preventDefault();
            var _this = _jquery2['default'](e.target);
            var type = _this.text();
            that.tipHandler(_this, type);
        });
    };

    return Pagination;
})();

exports['default'] = function () {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return new Pagination(options);
};

module.exports = exports['default'];