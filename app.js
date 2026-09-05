import http from "node:http";

let users = [
    {id: 1, name: "joca"},
    {id: 2, name: "jaquina"}, 
    {id: 3, name: "maria"}
];

const DEFAULT_HEADER = {
    "Content-Type": "application/json"
}

function findAll(){
    console.log("findall func");
    return users;
}

function find(id) {
    console.log("find func");
    let user = users.find(user => user.id === id);
    if(!user) {
        throw new Error("NOT FOUND");
    }
    return user;
}

function inactive(id) {
    console.log("inactive func");
    find(id);
    users = users.filter((user) => id !== user.id);

    return "NO CONTENT";
}

function create(user) {
    if(!user.id || !user.name) {
        throw new Error("INVALID_JSON");
    }

    const userExists = users.some(
        currentUser => currentUser.id === user.id
    )

    if(userExists) {
        throw new Error("USER_ALREADY_EXISTS");
    }

    users.push(user);
    return (users);
}

function update(user) {
    console.log("update func");
    if(!user.id || !user.name) {
        throw new Error("INVALID_JSON");
    }

    const index = users.findIndex(currentUser => currentUser.id === user.id);
    if(index === -1) {
        throw new Error("NOT_FOUND");
    }

    users[index] = user;

    return user;
}

function sendJson(res, statusCode, data) {
    res.writeHead(statusCode, DEFAULT_HEADER);
    res.end(JSON.stringify(data))
}

function readBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        })

        req.on("end", () => {
            try {
                resolve(JSON.parse(body))
            } catch {
                reject(new Error("INVALID_JSON"))
            }
        });

        req.on("error", reject);
    })
}

function handleErrors(res, error) {
    switch(error.message) {
        case "BAD_REQUEST": 
        case "INVALID_JSON" :
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

const server = http.createServer(async (req, res) => {
    try{
        switch(req.method) {
            case "GET": {
                const users = findAll();
                return sendJson(res, 200, users);
            }

            case "POST": {
                const body = await readBody(req);
                const user = create(body);
                return sendJson(res, 201, user);
            }
            case "DELETE":
                return sendJson(res, 501, {
                    error: "NOT_IMPLEMENTED"
                });
            default:
                return sendJson(res, 405, {
                    error: "METHOD_NOT_ALLOWED"
                });
        }
    } catch(error) {
        handleErrors(res, error);
    }
});

server.listen(4000, () => {
    console.log("Server Running at http:://localhost:4000");
});

