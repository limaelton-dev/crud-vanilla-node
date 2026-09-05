import { sendJson } from "./response.js";

export function handleErrors(res, error) {
    switch (error.message) {
        case "BAD_REQUEST":
        case "INVALID_JSON":
            return sendJson(res, 400, {
                error: error.message
            });

        case "USER_NOT_FOUND":
            return sendJson(res, 404, {
                error: error.message
            });

        case "USER_ALREADY_EXISTS":
            return sendJson(res, 409, {
                error: error.message
            });

        default:
            console.error(error);

            return sendJson(res, 500, {
                error: "INTERNAL_SERVER_ERROR"
            });
    }
}