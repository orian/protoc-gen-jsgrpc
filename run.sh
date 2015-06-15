#!/bin/bash
go build
protoc --js_out=testdata/ testdata/multi/multi{1,2,3}.proto --plugin=protoc-gen-js --proto_path=testdata/
