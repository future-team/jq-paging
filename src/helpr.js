import Handlebars from '../node_modules/handlebars/runtime';
Handlebars.registerHelper("urls", function(pages,urls,options) {
    var item = '';
    for(var i =0;i<pages.length;i++){
        var opts = pages[i];
        opts.url = urls[i];
        item +=  pages[i].cur ? options.fn(pages[i]) : options.inverse(opts);
    }
    return item;
});
Handlebars.registerHelper("noUrls", function(pages,options) {
    var item = '';
    for(var i =0;i<pages.length;i++){
        var opts = pages[i];
        item +=  pages[i].cur?options.fn(opts):options.inverse(opts);
    }
    return item;
});