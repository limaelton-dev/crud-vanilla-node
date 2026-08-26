import http from "node:http";

let users = [
    {id: 1, name: "joca"},
    {id: 2, name: "joca"}, 
    {id: 3, name: "maria"}
]

function findAll(){
    return users;
}

function find(id) {
    let user = users.find(() => id === name);
    if(!user) {
        return new error("NOT FOUND");
    }
    return user;
}

function inactive(id) {
    find(id);
    users = users.filter(() => id = name);

    return "NO CONTENT";
}

function create(user) {
    if(!user.id && !user.name) {
        return new error("BAD REQUEST");
    }
    users.push(user);
    return (users);
}

function update(user) {
    if(!user.id && !user.name) {
        return new error("BAD REQUEST");
    }

    const index = users.findIndex( user => user.id === id);
    if(index === -1) {
        return new error("NOT FOUND");
    }
}

const server = http.createServer((req, res) => {
    switch(req.method) {
        case "GET":
            break;
        case "POST":
            break;
        case "DELETE":
            break
        default:
            throw new error("BAD REQUEST");
}});

server.listen(4000);

