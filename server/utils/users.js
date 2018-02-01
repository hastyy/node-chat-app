class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        const user = { id, name, room };
        this.users.push(user);
        return user;
    }

    getUser(id) {
        // If not found, returns undefined
        return this.users.filter(user => user.id === id)[0];
    }

    // removeUser(id) {
    //     let removedUser;
    //     this.users = this.users.filter((user) => {
    //         if (user.id === id) {
    //             removedUser = user;
    //             return false;
    //         }

    //         return true;
    //     });
    //     return removedUser; // If not found, returns undefined
    // }

    removeUser(id) {
        const user = this.getUser(id);

        if (user)
            this.users = this.users.filter(user => user.id !== id);

        return user;
    }

    getUserList(room) {
        const users = this.users.filter(user => user.room === room);
        return users.map(user => user.name);
    }
}


module.exports = { Users };