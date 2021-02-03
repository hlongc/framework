"use strict";
function createArray(length, val) {
    const res = [];
    for (let i = 0; i < length; i++) {
        res[i] = val;
    }
    return res;
}
const r = createArray(5, 'x'); // 泛型在使用时才知道类型，定义函数时不明确
console.log(r);
const root = document.getElementById('root');
const children = root.children;
const childNodes = root.childNodes;
function getLen(val) {
    console.log(val.length);
}
