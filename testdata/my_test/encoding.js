goog.provide('proto.encoding');

goog.require('proto');

/*
 * @constructor
 * @implements {proto.Encoding}
 */
proto.encoding.JSON = function() {};

proto.encoding.JSON.prototype.encode = function(src, dest) {};

proto.encoding.JSON.prototype.decode = function(src, dest) {};

// Encodes a protos as lists instead objects.
// message Msg {
//     optional int num = 1;
//     repeated string name = 2;
// }
//
// var m = new Msg();
// m.num = 12;
// m.addName("pawel");
// m.addName("michal");
//
// will be encoded as:
// [1, 12, 2, "pawel", 2, "michal"]
//proto.encoding.JSONList = function() {};