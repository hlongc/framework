"use strict";

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Greeter = /*#__PURE__*/ (function () {
  function Greeter(message) {
    _classCallCheck(this, Greeter);

    this.greeting = message;
  }

  _createClass(
    Greeter,
    [
      {
        key: "greet",
        value: function greet() {
          return "Hello, " + this.greeting;
        },
      },
    ],
    [
      {
        key: "Version",
        value: function Version() {
          return "0.1.1";
        },
      },
    ]
  );

  return Greeter;
})();

var greeter = new Greeter("world");

// class Greeter {
//   constructor(message) {
//       this.greeting = message;
//   }
//   static Version() {
//     return '0.1.1'
//   }
//   greet() {
//       return "Hello, " + this.greeting;
//   }
// }
// let greeter = new Greeter("world");
