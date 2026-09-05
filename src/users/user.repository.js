let users = [
    { id: 1, name: "joca" },
    { id: 2, name: "jaquina" },
    { id: 3, name: "maria" }
];

export function findAll() {
    return users;
}

export function findById(id) {
    return users.find(user => user.id === id);
}

export function existsById(id) {
    return users.some( user => user.id === id);
}

export function create(user) {
    users.push(user);

    return users;
}

export function update(user) {
    const index = users.findIndex(
        currentUser => currentUser.id === user.id
    );

    if(index === -1) {
        return null;
    }

    users[index] = user;

    return user;
}

export function remove(id) {
    users = users.filter(user => user.id !== id);
}