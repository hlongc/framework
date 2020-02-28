"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
}());
// 一个类只能继承一个抽象类，但是能实现多个接口
var Duck = /** @class */ (function (_super) {
    __extends(Duck, _super);
    function Duck() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Duck.prototype.say = function () {
        console.log("\u6211\u662F" + this.name);
    };
    Duck.prototype.drink = function () {
        console.log('我是哺乳动物，要喝母乳');
    };
    Duck.prototype.crawl = function () {
        console.log('爬行');
    };
    return Duck;
}(Animal));
var duck = new Duck('鸭子');
duck.say();
duck.drink();
duck.crawl();
var count = function (price) { return price * 0.85; };
