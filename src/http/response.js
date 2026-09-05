const DEFAULT_HEADER = {
    "Content-Type": "application/json"
};

export function sendJson(res, statusCode, data) {
    res.writeHead(statusCode, DEFAULT_HEADER);
    res.end(JSON.stringify(data));
}

export function readBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            try {
                resolve(JSON.parse(body));
            } catch {
                reject(new Error("INVALID_JSON"));
            }
        });

        req.on("error", reject);
    });
}