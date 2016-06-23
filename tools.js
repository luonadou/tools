(function(){
	var root = this;
	var preTooles = root._;
	_.VERSION = '1.0';
	// Create a safe reference to the Underscore object for use below.
	var _ = function(obj) {
		if (obj instanceof _) return obj;
		if (!(this instanceof _)) return new _(obj);
		this._wrapped = obj;
	};
	// Export the Underscore object for **Node.js**, with
	// backwards-compatibility for the old `require()` API. If we're in
	// the browser, add `_` as a global object.
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = _;
		}
			exports._ = _;
	} else {
		root._ = _;
	}
	// Internal function that returns an efficient (for current engines) version
	// of the passed-in callback, to be repeatedly applied in other Underscore
	// functions.
	var optimizeCb = function(func, context, argCount) {
		if (context === void 0) return func;

		switch (argCount == null ? 3 : argCount) {
			case 1: return function(value) {
				return func.call(context, value);
			};
			case 2: return function(value, other) {
				return func.call(context, value, other);
			};
			case 3: return function(value, index, collection) {
				return func.call(context, value, index, collection);
			};
			case 4: return function(accumulator, value, index, collection) {
				return func.call(context, accumulator, value, index, collection);
		};
		}
		return function() {
			return func.apply(context, arguments);
		};
	};
	// Helper for collection methods to determine whether a collection
	// should be iterated as an array or as an object
	// Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	// Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	var getLength = property('length');
	var isArrayLike = function(collection) {
		var length = getLength(collection);
		return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	};
	_.each = _.forEach = function(obj,iteratee,context){
		iteratee = optimizeCb(iteratee, context);
		var i, length;
		if (isArrayLike(obj)) {
			for (i = 0, length = obj.length; i < length; i++) {
				iteratee(obj[i], i, obj);
			}
		} else {
			var keys = _.keys(obj);
			for (i = 0, length = keys.length; i < length; i++) {
				iteratee(obj[keys[i]], keys[i], obj);
			}
		}
		return obj;
	}
	_.isFunction = function(value){
		return typeof value === 'function';
	}
	_.isElement = function(node){

	}
	_.noop = function(){}
	// AMD registration happens at the end for compatibility with AMD loaders
	// that may not enforce next-turn semantics on modules. Even though general
	// practice for AMD registration is to be anonymous, underscore registers
	// as a named module because, like jQuery, it is a base library that is
	// popular enough to be bundled in a third party lib, but not be part of
	// an AMD load request. Those cases could generate an error when an
	// anonymous define() is called outside of a loader request.
	if (typeof define === 'function' && define.amd) {
		define('underscore', [], function() {
			return _;
		});
	}

}.call(this))