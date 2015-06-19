// Go support for Protocol Buffers - Google's data interchange format
//
// Copyright 2015 The Go Authors.  All rights reserved.
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

// Package jsgrpc outputs JavaScript gRPC service descriptions in Go code.
// It runs as a plugin for the Go protocol buffer compiler plugin.
// It is linked in to protoc-gen-jsgrpc.
package jsgrpc

import (
	"fmt"
	"log"

	pb "github.com/golang/protobuf/protoc-gen-go/descriptor"
	"github.com/orian/protoc-gen-jsgrpc/generator"
)

func init() {
	generator.RegisterPlugin(new(jsgrpc))
}

// jsgrpc is an implementation of the Go protocol buffer compiler's
// plugin architecture.  It generates bindings for JavaScript gRPC support.
type jsgrpc struct {
	gen *generator.Generator
}

// Name returns the name of this plugin, "jsgrpc".
func (g *jsgrpc) Name() string {
	return "jsgrpc"
}

// Init initializes the plugin.
func (g *jsgrpc) Init(gen *generator.Generator) {
	g.gen = gen
}

// Given a type name defined in a .proto, return its object.
// Also record that we're using it, to guarantee the associated import.
func (g *jsgrpc) objectNamed(name string) generator.Object {
	g.gen.RecordTypeUse(name)
	return g.gen.ObjectNamed(name)
}

// Given a type name defined in a .proto, return its name as we will print it.
func (g *jsgrpc) typeName(str string) string {
	return g.gen.TypeName(g.objectNamed(str))
}

// P forwards to g.gen.P.
func (g *jsgrpc) P(args ...interface{}) { g.gen.P(args...) }

// Generate generates code for the services in the given file.
func (g *jsgrpc) Generate(file *generator.FileDescriptor) {
	for i, service := range file.FileDescriptorProto.Service {
		g.generateService(file, service, i)
	}
}

// GenerateImports generates the import declaration for this file.
func (g *jsgrpc) GenerateImports(file *generator.FileDescriptor) {
	if len(file.FileDescriptorProto.Service) == 0 {
		return
	}
	g.P("goog.require('orian.jsrpc.Client');")
}

// generateService generates all the code for the named service.
func (g *jsgrpc) generateService(file *generator.FileDescriptor, service *pb.ServiceDescriptorProto, index int) {
	path := fmt.Sprintf("6,%d", index) // 6 means service.

	origServName := service.GetName()
	fullServName := file.GetPackage() + "." + origServName
	servName := generator.CamelCase(origServName)

	g.P("/**")
	g.P(" * A ", servName, " client.")
	g.P(" * @param {String} baseUrl is prefix for API calls.")
	g.P(" * @constructor")
	g.P(" * @extends {orian.jsgrpc.Client}")
	g.P(" * @final")
	g.P(" */")
	g.P(fullServName, " = function(baseUrl) {")
	g.gen.In()
	g.P("orian.jsgrpc.Client.call(this, baseUrl, ", servName, ");")
	g.gen.Out()
	g.P("};")
	g.P()

	// Client method implementations.
	for i, method := range service.Method {
		methodName := generator.CamelCase(method.GetName())
		if method.GetServerStreaming() || method.GetClientStreaming() {
			// Streaming RPC method
			log.Printf("streaming not suported %s", fullServName, methodName)
		}
		g.gen.PrintComments(fmt.Sprintf("%s,2,%d", path, i)) // 2 means method in a service.
		g.generateClientMethod(servName, fullServName, method)
	}
}

func (g *jsgrpc) generateClientMethod(servName, fullServName string, method *pb.MethodDescriptorProto) {
	methName := generator.CamelCase(method.GetName())
	inType := g.typeName(method.GetInputType())
	outType := g.typeName(method.GetOutputType())
	g.P("/** A ", methName, " API call.")
	g.P(" * @param {", inType, "}")
	g.P(" * @param {function(", outType, ")}")
	g.P(" * @param {function(", outType, ")}")
	g.P(" */")
	g.P(fullServName, ".prototype.", methName, " = function(arg, success, failure) {")
	g.gen.In()
	g.P("this.apiCall_('", methName, "', arg, success, failure);")
	g.gen.Out()
	g.P("};")
}