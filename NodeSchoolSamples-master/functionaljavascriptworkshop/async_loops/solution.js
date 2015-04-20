function loadUsers(userIds, load, done) {
    var users = [];
    var currentCount = 0;
    userIds.forEach(function (userId, index) {
        load(userId, function (user) {
            users[index] = user;
            if (++currentCount === userIds.length) return done(users);
        });
    });
};

module.exports = loadUsers;