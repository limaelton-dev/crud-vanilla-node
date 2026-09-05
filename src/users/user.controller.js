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

        case "DELETE": {
            return sendJson(res, 501, {
                error: "NOT_IMPLEMENTED"
            });
        }

        default:
            return sendJson(res, 405, {
                error: "METHOD_NOT_ALLOWED"
            });
    }
}