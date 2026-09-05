import http from  "node:http";

import { UserModule } from "./users/user.module.js";
import { handleErrors } from "./http/errors.js";
import { sendJson } from "./http/response.js";

const modules = {
    users: UserModule
}

const server = http.createServer(async (req, res) => {
    try {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const [, moduleName, id ] = url.pathname.split("/");
        
        const module = modules[moduleName];
        
        if(!module) {
            return sendJson(res, 404, {
                error: "MODULE_NOT_FOUND"
            });
        }

        return await module.controller.handle(req, res, {
            id: id ? Number(id) : null, 
            query: Object.fromEntries(url.searchParams)
        });
    } catch(error) {
        return handleErrors(res, error);
    }
});

server.listen(3000, () => {
    console.log("Server Running at http://localhost:3000");
});