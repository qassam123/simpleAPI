"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var url_1 = require("url");
var os_1 = require("os");
var PORT = 3000;
var greetSomeName = function (req, res, queryParameters) {
    var someName = queryParameters.get('name') || 'World';
    var data = { greeting: "Hello, ".concat(someName) };
    sendJsonResponse(res, 200, data);
};
var getInformation = function (req, res) {
    var responseData = {
        time: Date().toString(),
        client_address: req.socket.remoteAddress,
        host_name: (0, os_1.hostname)(),
        headers: req.headers
    };
    sendJsonResponse(res, 200, responseData);
};
var sendJsonResponse = function (res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
};
http.createServer(function (req, res) {
    var method = req.method, url = req.url;
    if (!url) {
        return;
    }
    var parsedUrl = new url_1.URL(url, "http://".concat(req.headers.host));
    var path = parsedUrl.pathname;
    var queryParams = parsedUrl.searchParams;
    if (path === "/hello") {
        greetSomeName(req, res, queryParams);
    }
    if (path === "/info") {
        getInformation(req, res);
    }
}).listen(PORT, function () {
    console.log("listening... ");
});
