"use strict";
const names = 'hello1';
let age = 1234567890;
let isMerried = false;
const arr1 = ['1', '2'];
const arr2 = [1, 2, 3];
// 元祖 数量和类型都固定的数组
const person = ['hlongc', 20];
var Gender;
(function (Gender) {
    Gender[Gender["BOY"] = 0] = "BOY";
    Gender[Gender["GIRL"] = 1] = "GIRL";
})(Gender || (Gender = {}));
console.log(Gender.BOY);
function greet(name) {
    console.log(name);
}
greet('hlc');
let demo = 'hlc';
const name123 = 12345;
console.log(name123);
const getUserName = (firstname, lastname) => {
    return firstname + lastname;
};
console.log(getUserName('hu', 'longchao'));
