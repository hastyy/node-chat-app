const expect = require('expect');
const { Users } = require('./users');


describe('Users', () => {

    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [
            { id: '1', name: 'Mike', room: 'Node Course'},
            { id: '2', name: 'Jen', room: 'React Course'},
            { id: '3', name: 'Julie', room: 'Node Course'}
        ];
    });

    it('should add new user', () => {
        const users = new Users();
        const user = {
            id: '123',
            name: 'John',
            room: 'The Office'
        };

        const resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([ user ]);
    });

    it('should find user', () => {
        const user = users.getUser('1');
        expect(user.name).toBe('Mike');
    });

    it('should not find user', () => {
        const user = users.getUser('4');
        expect(user).toNotExist();
    });

    it('should remove a user', () => {
        const length = users.users.length;
        const user = users.removeUser('1');
        expect(users.users.length).toBe(length - 1);
        expect(user.name).toBe('Mike');
    });

    it('should not remove a user', () => {
        const length = users.users.length;
        const user = users.removeUser('4');
        expect(users.users.length).toBe(length);
        expect(user).toNotExist();
    });

    it('should return names for Node Course', () => {
        const userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Mike', 'Julie']);
    });

    it('should return names for React Course', () => {
        const userList = users.getUserList('React Course');
        expect(userList).toEqual(['Jen']);
    });

});