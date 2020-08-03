(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  var resource = {
    init: function init(cb) {
      window.addEventListener('load', function () {
        var resource = performance.getEntriesByType('resource');
        cb(resource.filter(function (item) {
          return !item.name.endsWith('bundle.js');
        }).map(function (_) {
          return {
            name: _.name,
            initiatorType: _.initiatorType,
            duration: _.duration
          };
        }));
      });
    }
  };

  // 性能监控 performance
  //   console.log(data)
  // })

  resource.init(function (data) {
    console.log(data);
  }); // 页面静态资源加载情况
  // 错误监控

})));
