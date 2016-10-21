'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _node_modulesHandlebarsRuntime = require('../node_modules/handlebars/runtime');

var _node_modulesHandlebarsRuntime2 = _interopRequireDefault(_node_modulesHandlebarsRuntime);

_node_modulesHandlebarsRuntime2['default'].registerHelper("urls", function (pages, urls, options) {
    var item = '';
    for (var i = 0; i < pages.length; i++) {
        var opts = pages[i];
        opts.url = urls[i];
        item += pages[i].cur ? options.fn(pages[i]) : options.inverse(opts);
    }
    return item;
});
_node_modulesHandlebarsRuntime2['default'].registerHelper("noUrls", function (pages, options) {
    var item = '';
    for (var i = 0; i < pages.length; i++) {
        var opts = pages[i];
        item += pages[i].cur ? options.fn(opts) : options.inverse(opts);
    }
    return item;
});