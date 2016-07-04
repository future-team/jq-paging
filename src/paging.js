import $ from 'jquery';
import opts from './options.js';
import pagesTemplate from '../template/pages.html';
class Pagination {
    constructor(options) {
        this.opts = $.extend({}, opts, options);
        //插入标记位
        this.root = $(this.opts.root);
        this.renderPagination();
        this.bindEvents();
    }

    /**
     * 获取分页列表
     * */
    renderPagination() {
        this.opts.pageNum = this.getPageNum();
        this.opts.showPages = this.getShowPage(this.opts.pageNum);
        this.opts.root && this.renderHtml();
    }

    /**
     * 渲染页面
     * */
    renderHtml() {
        let pages = pagesTemplate(this.opts);
        this.root.html(pages);
    }
    /**
     * 获取页数
     * */
    getPageNum() {
        return Math.ceil(this.opts.total / this.opts.pageSize);
    }

    /**
     * 获取显示的页数
     * */
    getShowPage(pageNum) {
        let showNum = this.opts.showNum;
        let addIndex = parseInt(showNum / 2);
        let endIndex = showNum,
            startIndex = 1,
            pages = [];
        let currentPage = this.opts.currentPage;
        currentPage > 1 && pages.push({type: 'text', val: '上一页'});
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
        let curr = false;
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
        (pageNum > showNum && currentPage < pageNum - addIndex) && pages.push({type: 'text', val: '...'}, {
            type: 'num',
            val: pageNum
        });
        currentPage < pageNum && pages.push({type: 'text', val: '下一页'});
        return pages;
    }

    /**
     * 前往第n页
     * */
    goToPage(num) {
        this.opts.currentPage = num;
        this.renderPagination();
        this.opts.clickCallBack && this.opts.clickCallBack(num);
    }

    /**
     * 上一页或者下一页
     * true为下一页
     * */
    nextPrev(flag) {
        let num = flag ? this.opts.currentPage + 1 : this.opts.currentPage - 1;
        this.goToPage(num);
    }
    /**
     * 不同提示处理
     * */
    tipHandler(target, type) {
        switch (type) {
            case '下一页':
                this.nextPrev(true);
                break;
            case '上一页':
                this.nextPrev(false);
                break;
            default :
                break
        }
    }

    bindEvents() {
        let _this = this.root,
            that = this;
        _this.on('click', 'a[data-type="num"]', function (e) {
            e.preventDefault();
            let _this = $(e.target);
            let num = parseInt(_this.text());
            that.goToPage(num);
        });
        _this.on('click', 'a[data-type="text"]', function (e) {
            e.preventDefault();
            let _this = $(e.target);
            let type = _this.text();
            that.tipHandler(_this, type);
        })
    }
}

export default (options = {})=> {
    return new Pagination(options)
};