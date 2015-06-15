// Go support for Protocol Buffers - Google's data interchange format
//
// Copyright 2010 The Go Authors.  All rights reserved.
// https://github.com/golang/protobuf
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//     * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

goog.provide("my.test");

goog.require("multi.multi1");
//import "imp.proto";
import "multi/multi1.proto";  // unused import

/*
 * Enum...
 * @enum {number}
 */
test.HatType = {
  // deliberately skipping 0
  FEDORA: 1,
  FEZ: 2
};

/*
 * This enum represents days of the week.
 * @enum {number}
 */
test.Days = {
  // option allow_alias = true;
  MONDAY: 1,
  TUESDAY: 2,
  LUNDI: 1  // same value as MONDAY
};

/*
 * This is a message that might be sent somewhere.
 * @constructor
 */
test.Request = function() {
  /*
   * @type {Array.<!number>}
   */
  this.key = [];

  /*
   * @type {test.Request.Color}
   */
  this.hue = null;

  /*
   * @type {test.HatType}
   */
  this.hat = test.HatType.FEDORA;

  /*
   * @type {number}
   */
  this.deadline = Number.POSITIVE_INFINITY;

  /*
   * @type {type.SomeGroup_Type}
   */
  this.someGroup = null;

  /*
   * @type {Object.<number, string>}
   */
  this.nameMapping = {};

  /*
   * @type {Object.<number, test.Reply>}
   */
  this.msgMapping = {};

  /*
   * @type {number}
   */
  this.reset = null;

  this.setFieldByName = function(name, value) {
    switch (name) {
      case "key":
        this.key = value;
      case "hue":
        this.color = value;
      case "hat":
        this.hat = value;
    };
  };

  this.setFieldByTag = function(tag, value) {
    switch (tag) {
      case 1:
        this.key = value;
      case 3:
        this.color = value;
      case 4:
        this.hat = value;
    }
  }

  this.fieldNameList = [];
  this.fieldTagList = [];
};

/*
 * @enum {number}
 */
test.Request.Color = {
  RED: 0,
  GREEN: 1,
  BLUE: 2
};


/*
 * @constructor
 */
test.Reply = function() {
  /*
   * @type {Array.<test.Reply.Entry>}
   */
  this.found = [];

  /*
   * @type {Array.<number>}
   */
  this.compactKeys = [];

  // extensions 100 to max
};

/*
 * @constructor
 */
test.Reply.Entry = function() {
  /*
   * @type {!number}
   */
  this.keyThatNeeds1234camelCasIng = 0;

  /*
   * @type {number}
   */
  this.value = 7;

  /*
   * @type {number}
   */
  this._myFieldName;
};

/*
 * @enum {!number}
 */
test.Reply.Entry.Game = {
  FOOTBALL: 1,
  TENNIS: 2
};

/*
 * @constructor
 */
test.OtherBase = function() {
  /*
   * @type {string}
   */
  this.name = null;

  this._extensions = [100, proto.MAX_FIELD_ID];
};



message ReplyExtensions {
  extend Reply {
    optional double time = 101;
    optional ReplyExtensions carrot = 105;
  }
  extend OtherBase {
    optional ReplyExtensions donut = 101;
  }
}

message OtherReplyExtensions {
  optional int32 key = 1;
}

// top-level extension
extend Reply {
  optional string tag = 103;
  optional OtherReplyExtensions donut = 106;
//  optional imp.ImportedMessage elephant = 107;  // extend with message from another file.
}

message OldReply {
  // Extensions will be encoded in MessageSet wire format.
  option message_set_wire_format = true;
  extensions 100 to max;
}

