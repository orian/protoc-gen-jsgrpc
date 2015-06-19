/**
 * Created by orian on 19.06.15.
 */
goog.provide('orian.grpc.Client');

goog.require('goog.net.XhrIo');

/**
 * A gRPC service client.
 * @param {String} baseUrl base url, e.g. /api
 * @param {String} service name.
 * @constructor
 * @final
 */
orian.grpc.Client = function (baseUrl, service) {
    /**
     *
     * @type {String}
     * @private
     */
    this.baseUrl_ = baseUrl;

    /**
     *
     * @type {String}
     * @private
     */
    this.service_ = service;
};

orian.grpc.Client.prototype.apiCall_ = function(method, arg, success, failure, requestConstructor, responseConstructor) {
    var url = this.baseUrl_ + '/' + this.service_ + '/' + method;
    if (requestConstructor && arg instanceof requestConstructor) {
        console.log("Proto not supported yet.");
        console.error("Proto not supported yet.");
    } else {
        var data = JSON.stringify(arg);
        var callback = function(e) {
            if (e.target.isSuccess()) {
                if (success) {
                    success(e.target.getResponseJson());
                }
            } else if (failure) {
                failure(e);
            }
        };
        goog.net.XhrIo.send(url, callback, 'POST', data, null, 30);
    }
};