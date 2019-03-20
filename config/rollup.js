var pkg = require('../package.json');

// 兼容 functional 和 @jsmini/functional，@jsmini/functional 替换为 jsmini_functional
var name = pkg.name.replace('@', '').replace(/\//g, '_');
var version = pkg.version;

var banner = 
`/*!
 * functional ${version} (https://github.com/jsmini/functional)
 * API https://github.com/jsmini/functional/blob/master/doc/api.md
 * Copyright 2017-${(new Date).getFullYear()} jsmini. All Rights Reserved
 * Licensed under MIT (https://github.com/jsmini/functional/blob/master/LICENSE)
 */
`;

exports.name = name;
exports.banner = banner;
