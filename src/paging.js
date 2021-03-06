import $ from 'jquery';
import opts from './options.js';
import './helpr.js';
import pagesTemplate from '../template/pages.html';
class Pagination {
    constructor(options) {
        this.opts = $.extend({}, opts, options);
        this.opts.id = this.getUniqueId();
        //是否通过link跳转
        this.opts.urlLink = this.opts.isLink;
        //插入标记位
        this.root = $(this.opts.root);
        /**
         * 非ajax，currentPage由url确定
         * * */
        this.opts.urlLink && (this.opts.currentPage = this.getUrlPage());
        this.renderPagination();
        /**
         * 非链接跳转才需要bindEvent
         * */
        !this.opts.urlLink && this.bindEvents();
    }
    /**
     * 从href中获取当前页，更改默认值
     * */
    getUrlPage() {
        var url = this.opts.linkOpts.baseUrl;
        return url.split(this.opts.linkOpts.key + '=')[1].split('&')+'';
    }

    /**
     * 获取链接跳转时参数
     * */
    getUrlParam() {
        this.baseUrl = this.opts.linkOpts.baseUrl;
        this.opts.links = this.getUrls();
    }
    /**
     * 获得每页具体url
     * */
    getUrls() {
        var self= this,
            links = [];
        var pageNums = this.opts.showPages,
            url = this.baseUrl,
            key= this.opts.linkOpts.key,
            cur = this.opts.currentPage;
        pageNums.forEach(function (item,index) {
            var val = self.mapText(item.val,cur);
            if(val == '...') {
                links.push('javascript:void(0)');
            }else{
                links.push(url.replace(eval('/'+key+'=\\d+/'),key+'='+val));
            }
        })
        return links;
    }
    /**
     * 处理文本的情况
     * */
    mapText(val,cur){
        var mapping = {
            '上一页':cur-1,
            '下一页':cur*1+1
        };
        return mapping[val] || val;
    }
    /**
     * 获取唯一的id
     * */
    getUniqueId() {
        return 'jq' + Math.floor(Math.random() * 100);
    }

    /**
     * 获取分页列表
     * */
    renderPagination() {
        this.opts.pageNum = this.getPageNum();
        //防止重新设置后总页数小于当前页,重置为1
        if (this.opts.currentPage > this.opts.pageNum) {
            this.opts.currentPage = 1;
        }
        this.opts.showPages = this.getShowPage(this.opts.pageNum);
        this.opts.urlLink && this.getUrlParam();
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
            if (currentPage < pageNum - addIndex) {
                endIndex = currentPage + addIndex;
                startIndex = currentPage - addIndex;
            } else if (currentPage <= pageNum) {
                endIndex = pageNum;
                /**
                 * 临界条件
                 * */
                startIndex = pageNum - showNum + 1;
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
        /**
         * 当前页正好等于showum时，并没有进行居中操作。
         * 总页数大于展示页且当前页小等于展示页数，增加...
         * */
        (pageNum > showNum && currentPage <= showNum) && pages.push({type: 'text', val: '...'}, {
            type: 'num',
            val: pageNum
        });
        /**
         * 当前页大于showum时，已经进行居中操作。
         * 剩下的页数，大于showum的1/2时增加...
         * */
        (currentPage > showNum && currentPage < pageNum - addIndex ) && pages.push({type: 'text', val: '...'}, {
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
            pageId = "#" + this.opts.id,
            that = this;
        _this.on('click', `${pageId} a[data - type = "num"]`, function (e) {
            e.preventDefault();
            let _this = $(e.target);
            let num = parseInt(_this.text());
            that.goToPage(num);
        }

    )
        ;
        _this.on('click', `${pageId} a[data - type = "text"]`,function (e) {
            e.preventDefault();
            let _this = $(e.target);
            let type = _this.text();
            that.tipHandler(_this, type);
        }

    )
    }

    setOpts(opts) {
        let options = this.opts;
        this.opts = $.extend({}, options, opts);
        this.renderPagination();
    }
}

export default (options = {}) =>{
    return new Pagination(options)
}
