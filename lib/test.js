/**
 * Created by panqianjin on 16/6/21.
 */
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var Pagination = (function () {
    function Pagination() {
        _classCallCheck(this, Pagination);

        this.a = 'test';
        this.render();
    }

    Pagination.prototype.render = function render() {
        alert(this.a);
    };

    return Pagination;
})();

exports['default'] = function () {
    var b = new Pagination();
    debugger;
    return b;
};

module.exports = exports['default'];