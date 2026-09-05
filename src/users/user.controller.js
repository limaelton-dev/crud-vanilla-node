import * as userService from "./user.service.js";
import { sendJson, readBody } from "../http/response.js";

export async function handle(req, res, params) {
    const { id } = params;
    switch (req.method) {
        case "GET": {
            if(id) {
                const user = userService.find(id);
                return sendJson(res, 200, user);
            }

            const users = userService.findAll();
            return sendJson(res, 200, users);
        }

        case "POST": {
            const body = await readBody(req);

            const user = userService.create(body);

            return sendJson(res, 201, user);
        }

        case "PUT": {
            if(!id) {
                throw new Error("BAD_REQUEST");
            }
            const body = await readBody(req);

            body.id = id;

            const user = userService.update(body);

            return sendJson(res, 200, user);
        }

        case "DELETE": {
            if(!id) {
                throw new Error("BAD_REQUEST");
            }
            userService.inactive(id);

            res.writeHead(204);
            return res.end();
        }

        default:
            return sendJson(res, 405, {
                error: "METHOD_NOT_ALLOWED"
            });
    }
}