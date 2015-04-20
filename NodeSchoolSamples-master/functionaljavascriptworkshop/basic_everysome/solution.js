module.exports = function checkUsersValid(goodUsers) {
    return function (submittedUsers) {
        submittedUsers.every(function (element) {
                goodUsers.some(function (ele) {
                        return (element.id == ele.id);
                    }
                })
        });

};
}