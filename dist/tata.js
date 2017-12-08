window["tata"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.text = text;
exports.log = log;
exports.info = info;
exports.warn = warn;
exports.error = error;
exports.success = success;
exports.ask = ask;
exports.clear = clear;

__webpack_require__(2);

function randomId() {
  return 'tata-' + Date.now();
}

function addIconsLink(href) {
  var iconLink = document.createElement('link');
  iconLink.rel = 'stylesheet';
  iconLink.href = href;
  document.head.appendChild(iconLink);
}

addIconsLink('https://fonts.googleapis.com/icon?family=Material+Icons');

function mapPostion() {
  var pos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'tr';

  switch (pos) {
    case 'tr':
      return 'top-right';
    case 'tm':
      return 'top-mid';
    case 'tl':
      return 'top-left';
    case 'mr':
      return 'mid-right';
    case 'mm':
      return 'mid-mid';
    case 'ml':
      return 'mid-left';
    case 'br':
      return 'bottom-right';
    case 'bm':
      return 'bottom-mid';
    case 'bl':
      return 'bottom-left';
    default:
      return 'top-right';
  }
}

function type2Icon() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'text';

  switch (type) {
    case 'text':
      return 'chat_bubble';
    case 'log':
      return 'textsms';
    case 'info':
      return 'forum';
    case 'warn':
      return 'info_outline';
    case 'success':
      return 'check';
    case 'error':
      return 'block';
    case 'ask':
      return 'help_outline';
    default:
      return '';
  }
}

function mapAnimateIn() {
  var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'fade';
  var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'tr';

  if (animate === 'slide') {
    switch (position) {
      case 'tr':
      case 'mr':
      case 'br':
        return 'slide-right-in';
      case 'tl':
      case 'ml':
      case 'bl':
        return 'slide-left-in';
      case 'tm':
        return 'slide-top-in';
      case 'bm':
        return 'slide-bottom-in';
    }
  }
  return 'fade-in';
}

function mapAnimateOut() {
  var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'fade';
  var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'tr';

  if (animate === 'slide') {
    switch (position) {
      case 'tr':
      case 'mr':
      case 'br':
        return 'slide-right-out';
      case 'tl':
      case 'ml':
      case 'bl':
        return 'slide-left-out';
      case 'tm':
        return 'slide-top-out';
      case 'bm':
        return 'slide-bottom-out';
    }
  }
  return 'fade-out';
}

function clickTaTa(event) {
  var target = event.target;
  if (target.classList.contains('tata-close')) return;
  this.opts.onClick.call(this);
}

function closeTaTa(event) {
  var target = event.target;
  if (!target.classList.contains('tata-close')) return;
  var id = target.parentNode.getAttribute('id');
  var ta = tatas.find(function (ta) {
    return ta.id === id;
  });
  var element = document.getElementById(id);

  element.classList.add(mapAnimateOut(ta.opts.animate, ta.opts.position));
  removeElement(element);

  !!ta.opts.onClose && typeof ta.opts.onClose === 'function' && ta.opts.onClose.call(ta);
}

document.addEventListener('click', closeTaTa, false);

var tatas = [];

function removeElement(element) {
  var timeout = setTimeout(function () {
    if (typeof element.remove === 'function') {
      element.remove();
    } else {
      document.body.removeChild(element);
    }
    clearTimeout(timeout);
  }, 800);
}

function render(title, text, opts) {
  var id = randomId();
  var icon = type2Icon(opts.type);
  var position = mapPostion(opts.position);
  var animate = mapAnimateIn(opts.animate, opts.position);
  var ta = { title: title, text: text, opts: opts, id: id };
  var idx = tatas.findIndex(function (tata) {
    return tata.id === id;
  });
  var prevTa = idx === 0 ? null : tatas[idx - 1];
  tatas.push(ta);

  var template = '\n  <div class="tata ' + opts.type + ' ' + animate + ' ' + position + '" id=' + id + '>\n    <i class="tata-icon material-icons">' + icon + '</i>\n    <div class="tata-body">\n      <h4 class="tata-title">' + title + '</h4>\n      <p class="tata-text">' + text + '</p>\n    </div>\n    ' + (opts.closeBtn || opts.holding ? '<button class="tata-close material-icons">clear</button>' : '') + '\n    ' + (!opts.holding && opts.progress ? '<div class="tata-progress"></div>' : '') + '\n  </div>\n ';

  document.body.insertAdjacentHTML('beforeend', template);
  console.log(performance.now());

  if (prevTa && prevTa.opts.position === ta.opts.position) {
    removeElement(document.getElementById(prevTa.id));
  }

  var element = document.getElementById(id);

  !!opts.onClick && typeof opts.onClick === 'function' && element.addEventListener('click', clickTaTa.bind(ta), {
    capture: true,
    once: true
  });

  if (!opts.holding && opts.progress) {
    var progress = element.querySelector('.tata-progress');
    progress.style.animation = opts.duration / 1000 + 's reduceWidth linear forwards';

    var vanish = setTimeout(function () {
      var idx = tatas.findIndex(function (ta) {
        return ta === ta;
      });
      tatas.splice(idx, 1);
      element.classList.add(mapAnimateOut(ta.opts.animate, ta.opts.position));
      console.log(performance.now());
      removeElement(element);
      clearTimeout(vanish);
      !!ta.opts.onClose && typeof ta.opts.onClose === 'function' && ta.opts.onClose.call(ta);
    }, opts.duration);
  }
}

var defaultOpts = {
  type: 'log',
  position: 'tr',
  animate: 'fade', // slide
  duration: 3000,
  progress: true,
  holding: false,
  closeBtn: true,
  onClick: null,
  onClose: null
};

function text() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '你好';
  var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '今天是' + new Date().toLocaleString();
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _opts = Object.assign({}, defaultOpts, opts, { type: 'text' });
  render(title, text, _opts);
}

function log() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '你好';
  var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '今天是' + new Date().toLocaleString();
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _opts = Object.assign({}, defaultOpts, opts, { type: 'log' });
  render(title, text, _opts);
}

function info() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '你好';
  var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '今天是' + new Date().toLocaleString();
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _opts = Object.assign({}, defaultOpts, opts, { type: 'info' });
  render(title, text, _opts);
}

function warn() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '你好';
  var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '今天是' + new Date().toLocaleString();
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _opts = Object.assign({}, defaultOpts, opts, { type: 'warn' });
  render(title, text, _opts);
}

function error() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '你好';
  var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '今天是' + new Date().toLocaleString();
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _opts = Object.assign({}, defaultOpts, opts, { type: 'error' });
  render(title, text, _opts);
}

function success() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '你好';
  var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '今天是' + new Date().toLocaleString();
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _opts = Object.assign({}, defaultOpts, opts, { type: 'success' });
  render(title, text, _opts);
}

function ask() {
  var _opts = Object.assign({}, defaultOpts, opts, { type: 'ask' });
  render(title, text, _opts);
}

function clear() {
  tatas.forEach(function (tata) {
    return removeElement(document.getElementById(tata.id));
  });
  tatas.length = 0;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./tata.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./tata.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, ".tata {\r\n  position: fixed;\r\n  display: flex;\r\n  justify-content: space-around;\r\n  align-items: center;\r\n  width: 300px;\r\n  border-radius: 3px;\r\n  color: #ffffff;\r\n  font-size: 16px;\r\n  z-index: 9999;\r\n  pointer-events: auto;\r\n  padding: 12px 14px 12px 20px;\r\n  box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.2);\r\n}\r\n\r\n.tata:hover {\r\n  opacity: 1;\r\n}\r\n\r\n.tata * {\r\n  box-sizing: border-box;\r\n}\r\n\r\n.tata .tata-icon {\r\n  font-size: 2em;\r\n  color: inherit;\r\n}\r\n\r\n.tata .tata-body {\r\n  margin: 0;\r\n  padding: 0 14px;\r\n  min-height: 38px;\r\n  min-width: 260px;\r\n}\r\n\r\n.tata .tata-title {\r\n  margin: 0 0 2px 0;\r\n  font-size: 1em;\r\n}\r\n\r\n.tata .tata-text {\r\n  margin: 0;\r\n  font-size: .9em;\r\n}\r\n\r\n.tata .tata-close {\r\n  position: absolute;\r\n  top: 6px;\r\n  right: 6px;\r\n  border: none;\r\n  margin: 0;\r\n  padding: 0;\r\n  font-size: 1em;\r\n  font-weight: bold;\r\n  color: inherit;\r\n  cursor: pointer;\r\n  outline: none;\r\n  background: transparent;\r\n}\r\n\r\n.tata-progress {\r\n  position: absolute;\r\n  bottom: -1px;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 5px;\r\n  border-radius: 0 0 3px 3px;\r\n  background: rgba(0, 0, 0, 0.2);\r\n}\r\n\r\n.tata .tata-close:hover {\r\n  opacity: 0.4;\r\n}\r\n\r\n.tata.top-right {\r\n  top: 12px;\r\n  right: 12px;\r\n}\r\n\r\n.tata.top-mid {\r\n  top: 12px;\r\n  left: 50%;\r\n  transform: translateX(-50%);\r\n}\r\n\r\n.tata.top-left {\r\n  top: 12px;\r\n  left: 12px;\r\n}\r\n\r\n.tata.bottom-right {\r\n  right: 12px;\r\n  bottom: 18px;\r\n}\r\n\r\n.tata.bottom-mid {\r\n  left: 50%;\r\n  bottom: 18px;\r\n  transform: translateX(-50%);\r\n}\r\n\r\n.tata.bottom-left {\r\n  bottom: 18px;\r\n  left: 12px;\r\n}\r\n\r\n.tata.mid-right {\r\n  top: 50%;\r\n  right: 12px;\r\n  transform: translateY(-50%);\r\n}\r\n\r\n.tata.mid-left {\r\n  top: 50%;\r\n  left: 12px;\r\n  transform: translateY(-50%);\r\n}\r\n\r\n.tata.mid-mid {\r\n  top: 35%;\r\n  left: 50%;\r\n  transform: translate(-50%, -50%);\r\n}\r\n\r\n.tata.text {\r\n  color: #fff;\r\n  background: #323232;\r\n}\r\n\r\n.tata.log {\r\n  color: #333333;\r\n  background: #fffffc;\r\n}\r\n\r\n.tata.info {\r\n  background: #2ca9e1;\r\n}\r\n\r\n.tata.warn {\r\n  background: #f89406;\r\n}\r\n\r\n.tata.error {\r\n  background: #e9546b;\r\n}\r\n\r\n.tata.success {\r\n  background: #38b48b;\r\n}\r\n\r\n.tata.fade-in {\r\n  animation: .4s ease-in fadeIn forwards;\r\n}\r\n\r\n.tata.fade-out {\r\n  animation: .4s linear fadeOut forwards;\r\n}\r\n\r\n.tata.slide-right-in {\r\n  animation: .4s ease slideRightIn forwards;\r\n}\r\n\r\n.tata.slide-right-out {\r\n  animation: .4s ease slideRightOut forwards;\r\n}\r\n\r\n.tata.slide-left-in {\r\n  animation: .4s ease slideLeftIn forwards;\r\n}\r\n\r\n.tata.slide-left-out {\r\n  animation: .4s ease slideLeftOut forwards;\r\n}\r\n\r\n.tata.slide-top-in {\r\n  animation: .4s ease slideTopIn forwards;\r\n}\r\n\r\n.tata.slide-top-out {\r\n  animation: .4s ease slideTopOut forwards;\r\n}\r\n\r\n.tata.slide-bottom-in {\r\n  animation: .4s ease slideBottomIn forwards;\r\n}\r\n\r\n.tata.slide-bottom-out {\r\n  animation: .4s ease slideBottomOut forwards;\r\n}\r\n\r\n@keyframes fadeIn {\r\n  from {\r\n    opacity: 0;\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n@keyframes fadeOut {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n@keyframes slideRightIn {\r\n  from {\r\n    right: -310px;\r\n  }\r\n\r\n  to {\r\n    right: 12px;\r\n  }\r\n}\r\n\r\n@keyframes slideRightOut {\r\n  from {\r\n    right: 12px;\r\n  }\r\n\r\n  to {\r\n    right: -310px;\r\n  }\r\n}\r\n\r\n@keyframes slideLeftIn {\r\n  from {\r\n    left: -310px;\r\n  }\r\n\r\n  to {\r\n    left: 12px;\r\n  }\r\n}\r\n\r\n@keyframes slideLeftOut {\r\n  from {\r\n    left: 12px;\r\n  }\r\n\r\n  to {\r\n    left: -310px;\r\n  }\r\n}\r\n\r\n@keyframes slideTopIn {\r\n  from {\r\n    top: calc(-100% + -12px);\r\n  }\r\n  to {\r\n    top: 12px;\r\n  }\r\n}\r\n\r\n@keyframes slideTopOut {\r\n  from {\r\n    top: 12px;\r\n  }\r\n  to {\r\n    top: calc(-100% + -12px);\r\n  }\r\n}\r\n\r\n@keyframes slideBottomIn {\r\n  from {\r\n    bottom: calc(-100% + -18px);\r\n  }\r\n  to {\r\n    bottom: 18px;\r\n  }\r\n}\r\n\r\n@keyframes slideBottomOut {\r\n  from {\r\n    bottom: 18px;\r\n  }\r\n  to {\r\n    bottom: calc(-100% + -18px);\r\n  }\r\n}\r\n\r\n@keyframes reduceWidth {\r\n  from {\r\n    width: 100%;\r\n  }\r\n\r\n  to {\r\n    width: 0%;\r\n  }\r\n}", ""]);

// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(6);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);