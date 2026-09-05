import * as userService from "./user.service.js";
import { sendJson, readBody } from "../http/response.js";

export async function handle(req, res) {
    switch (req.method) {
        case "GET": {
            const users = userService.findAll();

            return sendJson(res, 200, users);
        }

        case "POST": {
            const body = await readBody(req);

            const user = userService.create(body);

            return sendJson(res, 201, user);
        }

        case "PUT": {
            const body = await readBody(req);

            body.id = id;

            const user = userService.update(body);

            return sendJson(res, 200, user);
        }

        case "DELETE": {
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