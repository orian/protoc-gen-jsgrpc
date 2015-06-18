// Code generated by protoc-gen-jsgrpc.
// source: multi/multi1.proto
// DO NOT EDIT!

/*
Package multitest is a generated protocol buffer package.

It is generated from these files:
	multi/multi1.proto
	multi/multi2.proto
	multi/multi3.proto

It has these top-level messages:
	Multi1
*/
goog.provide('multitest');

goog.require('goog.proto2');



/**
 * Message multitest.Multi1.
 * @constructor
 * @extends {goog.proto2.Message}
 * @final
 */
multitest.Multi1 = function () {
  goog.proto2.Message.call(this);
};
goog.inherits(my.test.Request, goog.proto2.Message);

/**
 * Sets the value of the multi2 field.
 * @param {multitest.Multi2} value The value.
 */
multitest.Multi1.prototype.setMulti2 = function(value) {
  this.set$Value(1, value);
};

/**
 * Gets the value of the multi2 field.
 * @return {?multitest.Multi2} The value.
 */
multitest.Multi1.prototype.getMulti2 = function() {
  return /** @type {?multitest.Multi2} */ (this.get$Value(1));
};

/**
 * Sets the value of the color field.
 * @param {multitest.Multi2.Color} value The value.
 */
multitest.Multi1.prototype.setColor = function(value) {
  this.set$Value(2, value);
};

/**
 * Gets the value of the color field.
 * @return {?multitest.Multi2.Color} The value.
 */
multitest.Multi1.prototype.getColor = function() {
  return /** @type {?multitest.Multi2.Color} */ (this.get$Value(2));
};

/**
 * Sets the value of the hat_type field.
 * @param {multitest.Multi3.HatType} value The value.
 */
multitest.Multi1.prototype.setHatType = function(value) {
  this.set$Value(3, value);
};

/**
 * Gets the value of the hat_type field.
 * @return {?multitest.Multi3.HatType} The value.
 */
multitest.Multi1.prototype.getHatType = function() {
  return /** @type {?multitest.Multi3.HatType} */ (this.get$Value(3));
};

