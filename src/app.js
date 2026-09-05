import http from  "node:http";

import { UserModule } from "./users/user.module.js";
import { handleErrors } from "./http/errors.js";

const server = http.createServer(async (req, res) => {
    try {
        return await UserModule.controller.handle(req, res);
    } catch(error) {
        return handleErrors(res, error);
    }
});

server.listen(3000, () => {
    console.log("Server Running at http://localhost:3000");
});