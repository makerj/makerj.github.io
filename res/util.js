'use strict';
String.prototype.format = function () {
    var args = arguments;
    var unkeyed_index = 0;
    return this.replace(/\{{1,2}(\w*)\}{1,2}/g, function (match, key) {
        if (match.indexOf('{{') !== -1) { // {{dont-replace}}
            return match.replace('{{', '{').replace('}}', '}');
        }
        if (key === '') { // {}
            key = unkeyed_index;
            unkeyed_index++
        }
        if (key == +key) { // {0}
            return args[key] !== 'undefined'
                    ? args[key]
                    : match;
        } else { // {named}
            for (var i = 0; i < args.length; i++) {
                if (typeof args[i] === 'object' && typeof args[i][key] !== 'undefined') {
                    return args[i][key];
                }
            }
            return match;
        }
    }.bind(this));
};
function v(val, def) {
    if (val == null || typeof val === 'undefined')
        return def;
    if (typeof val === 'object')
        return Object.keys(val).length ? val : def;

    return val || def;
}
