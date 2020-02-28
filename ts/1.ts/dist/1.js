"use strict";
var names = 'hello1';
var age = 1234567890;
var isMerried = false;
var arr1 = ['1', '2'];
var arr2 = [1, 2, 3];
// 元祖 数量和类型都固定的数组
var person = ['hlongc', 20];
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
var demo = 'hlc';
var name123 = 12345;
console.log(name123);
var getUserName = function (firstname, lastname) {
    return firstname + lastname;
};
console.log(getUserName('hu', 'longchao'));
