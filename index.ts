import * as http from 'http';
import { URL } from 'url';
import { hostname } from 'os'

const PORT = 3000;

const greetSomeName = (req: http.IncomingMessage, res: http.ServerResponse, queryParameters: URLSearchParams): void => {
    const someName = queryParameters.get('name') || 'World';
    const data = { greeting: `Hello, ${someName}` };
    sendJsonResponse(res, 200, data);
};

const getInformation = (req: http.IncomingMessage, res: http.ServerResponse): void => {
    const responseData = {
        time: Date().toString(),
        client_address: req.socket.remoteAddress,
        host_name: hostname(),
        headers: req.headers
    };

    sendJsonResponse(res, 200, responseData);
};


const sendJsonResponse = (res: http.ServerResponse, statusCode: number, data: object): void => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
};

http.createServer((req: http.IncomingMessage, res: http.ServerResponse): void => {
    const { method, url } = req;

    if (!url) {
        return;
    }

    const parsedUrl = new URL(url, `http://${req.headers.host}`);
    const path = parsedUrl.pathname;
    const queryParams = parsedUrl.searchParams;

    if (path === "/hello") {
        greetSomeName(req, res, queryParams);
    }
    if (path === "/info") {
        getInformation(req, res)

    }

}).listen(PORT, () => {
    console.log("listening... ");
});
