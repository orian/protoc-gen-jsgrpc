goog.provide('proto');

/*
 * @param {!number} id is the id of extension
 * @param {!function} type is a constructor for a type.
 * @constructor
 */
proto.Extension = function(id, type) {
  this.id_ = id;
  this.type_ = type;
};

/*
 * Defines interface for a proto encoding.
 * @interface
 */
proto.Encoding = function() {};

proto.Encoding.prototype.encode = function(src, dest) {};

proto.Encoding.prototype.decode = function(src, dest) {};

// @enum
proto.TypeRepetition = {
    REQUIRED: 1,
    OPTIONAL: 2,
    REPEATED: 3
};

proto.TypeSimple = {
    INT: 1,
    STRING: 2,
    MESSAGE: 3
};

proto.Type = function() {};

proto.FieldDescriptor = function(type, name, tag) {};

/*
 * @constructor
 */
proto.Message = function() {
    /*
     * Keeps track of all extension directly set.
     * @type {Object.<!number, *>}
     */
    this.extensions_ = {};

    /*
     * Keeps track of all data which we could not decode.
     */
    this.raw_values_ = {};

    this.encoding_ = null;
};

/*
 * @param {!proto.Extension} ext is an extension instance.
 * @param {*} val is a value. It should match ext.type.
 */
proto.Message.prototype.setExtension = function(ext, val) {
    this.extensions_[ext.id_] = [ext, val];
};

proto.Message.prototype.getExtension = function(ext) {
    var msg = ext.type_();
    var raw = this.raw_values_[ext.id_];
    if (raw) {
        this.encoding_.Decode(raw, msg);
    }
    return msg;
};