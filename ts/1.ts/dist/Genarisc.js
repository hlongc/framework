"use strict";
function createArray(length, val) {
    var res = [];
    for (var i = 0; i < length; i++) {
        res[i] = val;
    }
    return res;
}
var r = createArray(5, 'x'); // 泛型在使用时才知道类型，定义函数时不明确
console.log(r);
var root = document.getElementById('root');
var children = root.children;
var childNodes = root.childNodes;
function getLen(val) {
    console.log(val.length);
}
