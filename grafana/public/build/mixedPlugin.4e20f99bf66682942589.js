(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{CaV2:function(e,t,r){"use strict";r.r(t);var n=r("BkRI"),o=r.n(n),a=r("bt/X"),c=r.n(a),u=r("F/XL"),i=r("0/uQ"),s=r("VNr4"),f=r("psW0"),b=r("67Y/"),p=r("9Z1F"),l=r("Zn8D"),y=r("Obii"),O=r("t8hP");function d(e){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function g(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function j(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function v(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function h(e,t){return!t||"object"!==d(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function m(e){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function w(e,t){return(w=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var P=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),h(this,m(t).call(this,e))}var r,n,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&w(e,t)}(t,e),r=t,(n=[{key:"query",value:function(e){var t=e.targets.filter((function(e){return"-- Mixed --"!==e.datasource}));if(!t.length)return Object(u.a)({data:[]});var r=c()(t,"datasource"),n=[];for(var o in r){var a=r[o],i=a[0].datasource;n.push({datasource:Object(O.getDataSourceSrv)().get(i,e.scopedVars),targets:a})}return this.batchQueries(n,e)}},{key:"batchQueries",value:function(e,t){var r=e.filter(this.isQueryable).map((function(e,r){return Object(i.a)(e.datasource).pipe(Object(f.b)((function(n){var a=o()(t);return a.requestId="mixed-".concat(r,"-").concat(a.requestId||""),a.targets=e.targets,Object(i.a)(n.query(a)).pipe(Object(b.a)((function(e){return function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?g(Object(r),!0).forEach((function(t){j(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):g(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e,{data:e.data||[],state:y.LoadingState.Loading,key:"mixed-".concat(r,"-").concat(e.key||"")})})),Object(p.a)((function(e){return(e=Object(O.toDataQueryError)(e)).message="".concat(n.name,": ").concat(e.message),Object(u.a)({data:[],state:y.LoadingState.Error,error:e,key:"mixed-".concat(r,"-").concat(a.requestId||"")})})))})))}));return Object(s.a)(r).pipe(Object(b.a)(this.finalizeResponses),Object(l.a)())}},{key:"testDatasource",value:function(){return Promise.resolve({})}},{key:"isQueryable",value:function(e){return e&&Array.isArray(e.targets)&&e.targets.length>0}},{key:"finalizeResponses",value:function(e){var t=e.length;if(0===t)return e;var r=e.find((function(e){return e.state===y.LoadingState.Error}));return r?e.push(r):e[t-1].state=y.LoadingState.Done,e}}])&&v(r.prototype,n),a&&v(r,a),t}(y.DataSourceApi);r.d(t,"MixedDatasource",(function(){return P})),r.d(t,"Datasource",(function(){return P}))}}]);
//# sourceMappingURL=mixedPlugin.4e20f99bf66682942589.js.map