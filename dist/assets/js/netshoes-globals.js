!function i(s,u,c){function a(e,t){if(!u[e]){if(!s[e]){var n="function"==typeof require&&require;if(!t&&n)return n(e,!0);if(l)return l(e,!0);var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}var o=u[e]={exports:{}};s[e][0].call(o.exports,function(t){return a(s[e][1][t]||t)},o,o.exports,i,s,u,c)}return u[e].exports}for(var l="function"==typeof require&&require,t=0;t<c.length;t++)a(c[t]);return a}({1:[function(t,e,n){"use strict";e.exports=t("./").polyfill()},{"./":2}],2:[function(z,n,r){(function(Y,$){var t,e;t=this,e=function(){"use strict";function a(t){return"function"==typeof t}var n=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},r=0,e=void 0,o=void 0,s=function(t,e){h[r]=t,h[r+1]=e,2===(r+=2)&&(o?o(d):y())};var t="undefined"!=typeof window?window:void 0,i=t||{},u=i.MutationObserver||i.WebKitMutationObserver,c="undefined"==typeof self&&void 0!==Y&&"[object process]"==={}.toString.call(Y),l="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel;function f(){var t=setTimeout;return function(){return t(d,1)}}var h=new Array(1e3);function d(){for(var t=0;t<r;t+=2){(0,h[t])(h[t+1]),h[t]=void 0,h[t+1]=void 0}r=0}var p,v,_,m,y=void 0;function g(t,e){var n=this,r=new this.constructor(T);void 0===r[w]&&R(r);var o=n._state;if(o){var i=arguments[o-1];s(function(){return D(o,r,i,n._result)})}else q(n,r,t,e);return r}function b(t){if(t&&"object"==typeof t&&t.constructor===this)return t;var e=new this(T);return S(e,t),e}y=c?function(){return Y.nextTick(d)}:u?(v=0,_=new u(d),m=document.createTextNode(""),_.observe(m,{characterData:!0}),function(){m.data=v=++v%2}):l?((p=new MessageChannel).port1.onmessage=d,function(){return p.port2.postMessage(0)}):void 0===t&&"function"==typeof z?function(){try{var t=Function("return this")().require("vertx");return void 0!==(e=t.runOnLoop||t.runOnContext)?function(){e(d)}:f()}catch(t){return f()}}():f();var w=Math.random().toString(36).substring(2);function T(){}var E=void 0,A=1,j=2,x={error:null};function C(t){try{return t.then}catch(t){return x.error=t,x}}function O(t,e,n){e.constructor===t.constructor&&n===g&&e.constructor.resolve===b?function(e,t){t._state===A?M(e,t._result):t._state===j?P(e,t._result):q(t,void 0,function(t){return S(e,t)},function(t){return P(e,t)})}(t,e):n===x?(P(t,x.error),x.error=null):void 0===n?M(t,e):a(n)?function(t,r,o){s(function(e){var n=!1,t=function(t,e,n,r){try{t.call(e,n,r)}catch(t){return t}}(o,r,function(t){n||(n=!0,r!==t?S(e,t):M(e,t))},function(t){n||(n=!0,P(e,t))},e._label);!n&&t&&(n=!0,P(e,t))},t)}(t,e,n):M(t,e)}function S(t,e){t===e?P(t,new TypeError("You cannot resolve a promise with itself")):!function(t){var e=typeof t;return null!==t&&("object"==e||"function"==e)}(e)?M(t,e):O(t,e,C(e))}function L(t){t._onerror&&t._onerror(t._result),k(t)}function M(t,e){t._state===E&&(t._result=e,t._state=A,0!==t._subscribers.length&&s(k,t))}function P(t,e){t._state===E&&(t._state=j,t._result=e,s(L,t))}function q(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+A]=n,o[i+j]=r,0===i&&t._state&&s(k,t)}function k(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)r=e[s],o=e[s+n],r?D(n,r,o,i):o(i);t._subscribers.length=0}}function D(t,e,n,r){var o=a(n),i=void 0,s=void 0,u=void 0,c=void 0;if(o){if((i=function(t,e){try{return t(e)}catch(t){return x.error=t,x}}(n,r))===x?(c=!0,s=i.error,i.error=null):u=!0,e===i)return void P(e,new TypeError("A promises callback cannot return that same promise."))}else i=r,u=!0;e._state!==E||(o&&u?S(e,i):c?P(e,s):t===A?M(e,i):t===j&&P(e,i))}var F=0;function R(t){t[w]=F++,t._state=void 0,t._result=void 0,t._subscribers=[]}var U=(H.prototype._enumerate=function(t){for(var e=0;this._state===E&&e<t.length;e++)this._eachEntry(t[e],e)},H.prototype._eachEntry=function(e,t){var n=this._instanceConstructor,r=n.resolve;if(r===b){var o=C(e);if(o===g&&e._state!==E)this._settledAt(e._state,t,e._result);else if("function"!=typeof o)this._remaining--,this._result[t]=e;else if(n===N){var i=new n(T);O(i,e,o),this._willSettleAt(i,t)}else this._willSettleAt(new n(function(t){return t(e)}),t)}else this._willSettleAt(r(e),t)},H.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===E&&(this._remaining--,t===j?P(r,n):this._result[e]=n),0===this._remaining&&M(r,this._result)},H.prototype._willSettleAt=function(t,e){var n=this;q(t,void 0,function(t){return n._settledAt(A,e,t)},function(t){return n._settledAt(j,e,t)})},H);function H(t,e){this._instanceConstructor=t,this.promise=new t(T),this.promise[w]||R(this.promise),n(e)?(this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?M(this.promise,this._result):(this.length=this.length||0,this._enumerate(e),0===this._remaining&&M(this.promise,this._result))):P(this.promise,new Error("Array Methods must be provided an Array"))}var N=(W.prototype.catch=function(t){return this.then(null,t)},W.prototype.finally=function(e){var n=this.constructor;return a(e)?this.then(function(t){return n.resolve(e()).then(function(){return t})},function(t){return n.resolve(e()).then(function(){throw t})}):this.then(e,e)},W);function W(t){this[w]=F++,this._result=this._state=void 0,this._subscribers=[],T!==t&&("function"!=typeof t&&function(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}(),this instanceof W?function(e,t){try{t(function(t){S(e,t)},function(t){P(e,t)})}catch(t){P(e,t)}}(this,t):function(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}())}return N.prototype.then=g,N.all=function(t){return new U(this,t).promise},N.race=function(o){var i=this;return n(o)?new i(function(t,e){for(var n=o.length,r=0;r<n;r++)i.resolve(o[r]).then(t,e)}):new i(function(t,e){return e(new TypeError("You must pass an array to race."))})},N.resolve=b,N.reject=function(t){var e=new this(T);return P(e,t),e},N._setScheduler=function(t){o=t},N._setAsap=function(t){s=t},N._asap=s,N.polyfill=function(){var t=void 0;if(void 0!==$)t=$;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var e=t.Promise;if(e){var n=null;try{n=Object.prototype.toString.call(e.resolve())}catch(t){}if("[object Promise]"===n&&!e.cast)return}t.Promise=N},N.Promise=N},"object"==typeof r&&void 0!==n?n.exports=e():"function"==typeof define&&define.amd?define(e):t.ES6Promise=e()}).call(this,z("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{_process:3}],3:[function(t,e,n){var r,o,i=e.exports={};function s(){throw new Error("setTimeout has not been defined")}function u(){throw new Error("clearTimeout has not been defined")}function c(e){if(r===setTimeout)return setTimeout(e,0);if((r===s||!r)&&setTimeout)return r=setTimeout,setTimeout(e,0);try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:s}catch(t){r=s}try{o="function"==typeof clearTimeout?clearTimeout:u}catch(t){o=u}}();var a,l=[],f=!1,h=-1;function d(){f&&a&&(f=!1,a.length?l=a.concat(l):h=-1,l.length&&p())}function p(){if(!f){var t=c(d);f=!0;for(var e=l.length;e;){for(a=l,l=[];++h<e;)a&&a[h].run();h=-1,e=l.length}a=null,f=!1,function(e){if(o===clearTimeout)return clearTimeout(e);if((o===u||!o)&&clearTimeout)return o=clearTimeout,clearTimeout(e);try{o(e)}catch(t){try{return o.call(null,e)}catch(t){return o.call(this,e)}}}(t)}}function v(t,e){this.fun=t,this.array=e}function _(){}i.nextTick=function(t){var e=new Array(arguments.length-1);if(1<arguments.length)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];l.push(new v(t,e)),1!==l.length||f||c(p)},v.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=_,i.addListener=_,i.once=_,i.off=_,i.removeListener=_,i.removeAllListeners=_,i.emit=_,i.prependListener=_,i.prependOnceListener=_,i.listeners=function(t){return[]},i.binding=function(t){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(t){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}},{}],4:[function(t,e,n){self.fetch||(self.fetch=function(c,a){return a=a||{},new Promise(function(t,e){var n=new XMLHttpRequest,r=[],o=[],i={},s=function(){return{ok:2==(n.status/100|0),statusText:n.statusText,status:n.status,url:n.responseURL,text:function(){return Promise.resolve(n.responseText)},json:function(){return Promise.resolve(JSON.parse(n.responseText))},blob:function(){return Promise.resolve(new Blob([n.response]))},clone:s,headers:{keys:function(){return r},entries:function(){return o},get:function(t){return i[t.toLowerCase()]},has:function(t){return t.toLowerCase()in i}}}};for(var u in n.open(a.method||"get",c,!0),n.onload=function(){n.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(t,e,n){r.push(e=e.toLowerCase()),o.push([e,n]),i[e]=i[e]?i[e]+","+n:n}),t(s())},n.onerror=e,n.withCredentials="include"==a.credentials,a.headers)n.setRequestHeader(u,a.headers[u]);n.send(a.body||null)})})},{}],5:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={shelf:{container:document.querySelector(".ns-shelf-container")},main:document.querySelector(".ns-main")}},{}],6:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r,o=t("./__cache-selectors.js");var i=((r=o)&&r.__esModule?r:{default:r}).default,s={init:function(){s.buildShelfs()},buildShelfs:function(){var e=s._productList("https://akf-netshoes-front-end.herokuapp.com/api/products","FETCH_PRODUCT_DONE");document.addEventListener("FETCH_PRODUCT_DONE",function(t){console.log(e),s._createShelfProduct(e,"ns-shelf-container__list")})},_createShelfProduct:function(t,e){var n=s._createElementWithClass("ul",e),r=e.slice(0,e.indexOf(" "))+"__item";i.shelf.container.insertAdjacentElement("afterbegin",n),t.map(function(t){var e=s._createElementWithClass("li",r);t.imageUrl?t.loader="":t.loader=" ns-shelf__img-loader",e.innerHTML='<a class="ns-shelf__link'+t.loader+'" href="#"><img class="ns-shelf__img" src="./dist/assets/images/'+t.image+'" alt="'+t.name+'"></a>\n                                <div class="ns-shelf__actions">\n                                    <div class="ns-shelf__actions--size">\n                                        \n                                    </div>\n                                    <div class="ns-shelf__actions--quant">\n                                        <button class="ns-shelf__qty--minus" data-qty-selector="-">-</button>\n                                        <input class="ns-shelf__qty" type="text" value="1" min="1">\n                                        <button class="ns-shelf__qty--plus" data-qty-selector="+">+</button>\n                                    </div>\n                                </div>\n                                <div class="ns-shelf__content">\n                                    <h3 class="ns-shelf__title">'+t.title+" "+t.description+'</h3>\n                                    <p class="ns-shelf__price-best">R$<span>'+Math.floor(t.price)+"</span>"+t.price.toFixed(2).toString().replace(/\d+\./g,",")+"</p>\n                                    "+(t.installments?'<p class="ns-shelf__price-installments">Ou '+t.installments+"x de R$ "+(t.price/t.installments).toFixed(2).replace(/\./gi,",")+"</p>":"")+"\n                                </div>\n                                ",n.insertAdjacentElement("beforeend",e)})},_productList:function(t,e){var n=new Array,r=e;return fetch(t).then(function(t){return t.json()}).then(function(t){n.push.apply(n,function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}(t)),s._sendCustomEvent(r)}).catch(function(t){return console.log(t)}),n},_sendCustomEvent:function(t){var e=new CustomEvent(t);document.dispatchEvent(e)},_createElementWithClass:function(t,e){var n=document.createElement(t);return e.split(" ")?e.split(" ").map(function(t){return n.classList.add(t)}):n.classList.add(e),n}};n.default={init:s.init}},{"./__cache-selectors.js":5}],7:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r,o=t("./_main-shelf.js"),i=(r=o)&&r.__esModule?r:{default:r};n.default={init:function(){i.default.init()}}},{"./_main-shelf.js":6}],8:[function(t,e,n){"use strict";t("es6-promise/auto"),t("unfetch/polyfill");var r,o=t("./modules/globals/globals-index.js"),i=(r=o)&&r.__esModule?r:{default:r};document.addEventListener("DOMContentLoaded",i.default.init)},{"./modules/globals/globals-index.js":7,"es6-promise/auto":1,"unfetch/polyfill":4}]},{},[8]);