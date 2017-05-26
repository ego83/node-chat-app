const expect = require('expect');

const {Users} = require('./users');



describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'maki',
      room: 'busyday course'
    }, {
      id: '2',
      name: 'jane',
      room: 'reactJS course'
    }, {
      id: '3',
      name: 'sopha',
      room: 'reactJS course'
    }];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '234534',
      name: 'ego',
      room: 'myRoom'
    };

    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });



  it('should remove a user', () => {
    var userId = '1';
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    var userId = '6';
    var user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find a user', () => {
    var userId = '2';
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not find a user', () => {
    var userId = '5';
    var user = users.getUser(userId);

    // expect(user[0].name).toBeA('undefined');
    expect(user).toNotExist();
  });




  it('should return names for reactJS course', () => {
    var userList = users.getUserList('reactJS course');

    expect(userList).toEqual(['jane', 'sopha']);
  });

  it('should return names for busyday course', () => {
    var userList = users.getUserList('busyday course');

    expect(userList).toEqual(['maki']);
  });
});
