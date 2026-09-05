import * as usersRepository from "./user.repository.js";

export function create(user) {
    if (!user.id || !user.name) {
        throw new Error("INVALID_JSON");
    }

    const userExists = usersRepository.existsById(user.id);

    if (userExists) {
        throw new Error("USER_ALREADY_EXISTS");
    }

    return usersRepository.create(user);
}

export function find(id) {
    const user = usersRepository.findById(id);

    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    return user;
}

export function findAll() {
    return usersRepository.findAll();
}

export function update(user) {
    console.log("update func");

    if (!user.id || !user.name) {
        throw new Error("INVALID_JSON");
    }

    const updatedUser = usersRepository.update(user);

    if (!updatedUser) {
        throw new Error("USER_NOT_FOUND");
    }

    return updatedUser;
}

export function remove(id) {
    find(id);
    usersRepository.remove(id);
}