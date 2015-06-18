// Code generated by protoc-gen-jsgrpc.
// source: multi/multi2.proto
// DO NOT EDIT!

goog.provide('multitest');

goog.require('goog.proto2');

goog.require('orian.jsrpc.Client');


/**
 * @enum {number}
 */
multitest.Multi2.Color = {
  BLUE: 1,
  GREEN: 2,
  RED: 3
};

multitest.Multi2.ColorNames = {
  1: "BLUE",
  2: "GREEN",
  3: "RED"
};

/**
 * Message multitest.Multi2.
 * @constructor
 * @extends {goog.proto2.Message}
 * @final
 */
multitest.Multi2 = function () {
  goog.proto2.Message.call(this);
};
goog.inherits(my.test.Request, goog.proto2.Message);

/**
 * Sets the value of the required_value field.
 * @param {Number} value The value.
 */
multitest.Multi2.prototype.setRequiredValue = function(value) {
  this.set$Value(1, value);
};

/**
 * Gets the value of the required_value field.
 * @return {?Number} The value.
 */
multitest.Multi2.prototype.getRequiredValue = function() {
  return /** @type {?Number} */ (this.get$Value(1));
};

/**
 * Sets the value of the color field.
 * @param {multitest.Multi2.Color} value The value.
 */
multitest.Multi2.prototype.setColor = function(value) {
  this.set$Value(2, value);
};

/**
 * Gets the value of the color field.
 * @return {?multitest.Multi2.Color} The value.
 */
multitest.Multi2.prototype.getColor = function() {
  return /** @type {?multitest.Multi2.Color} */ (this.get$Value(2));
};

/**
 * Message multitest.SearchRequest.
 * @constructor
 * @extends {goog.proto2.Message}
 * @final
 */
multitest.SearchRequest = function () {
  goog.proto2.Message.call(this);
};
goog.inherits(my.test.Request, goog.proto2.Message);

/**
 * Sets the value of the query field.
 * @param {String} value The value.
 */
multitest.SearchRequest.prototype.setQuery = function(value) {
  this.set$Value(1, value);
};

/**
 * Gets the value of the query field.
 * @return {?String} The value.
 */
multitest.SearchRequest.prototype.getQuery = function() {
  return /** @type {?String} */ (this.get$Value(1));
};

/**
 * Message multitest.SearchResponse.
 * @constructor
 * @extends {goog.proto2.Message}
 * @final
 */
multitest.SearchResponse = function () {
  goog.proto2.Message.call(this);
};
goog.inherits(my.test.Request, goog.proto2.Message);

/**
 * Adds the value to the result repeated field.
 * @param {Array.<String>} value The value.
 */
multitest.SearchResponse.prototype.addResult = function(value) {
  this.add$Value(1, value);
};

/**
 * Gets the value of the result field.
 * @param {!number} index of the element.
 * @return {?Array.<String>} The value.
 */
multitest.SearchResponse.prototype.getResult = function(index) {
  return /** @type {?Array.<String>} */ (this.get$Value(1, index));
};

/**
 * Gets the number of values in the result field.
 * @return {!number} number of value.
 */
multitest.SearchResponse.prototype.countResult = function() {
  return this.count$Values(1);
};

/**
 * Clears the values in the result field.
 */
multitest.SearchResponse.prototype.clearResult = function() {
  return this.clear$Field(1);
};

/**
 * A SearchService client.
 * @constructor
 * @extends {orian.jsgrpc.Client}
 * @final
 */
multitest.SearchService = function() {
  orian.jsgrpc.Client.call(this);
};

// Comment for method.
/** A Search API call.
 * @param {multitest.SearchRequest}
 * @param {function(multitest.SearchResponse)}
 * @param {function(multitest.SearchResponse)}
 */
multitest.SearchService.prototype.Search = function(arg, success, failure) {
  this.call_('Search', arg, success, failure);
};
