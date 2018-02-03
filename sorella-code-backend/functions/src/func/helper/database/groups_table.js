const admin = require('firebase-admin');
const _ = require('lodash');

const saveGroup = (groupId) => {
    const ref = admin.database().ref(`groups/${groupId}`);

    return new Promise((resolve, reject) => {
        const name = {
            groupName: groupId
        };

        ref.set(name)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const insertMember = (groupId, userId) => {
    const ref = admin.database().ref(`groups/${groupId}/members/${userId}`);

    return new Promise((resolve, reject) => {
        ref.set(true)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const removeMember = (groupId, userId) => {
    const ref = admin.database().ref(`groups/${groupId}/members/${userId}`);

    return new Promise((resolve, reject) => {
        ref.remove()
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const changeGroupName = (groupId, groupName) => {
    const ref = admin.database().ref(`groups/${groupId}/groupName`);

    return new Promise((resolve, reject) => {
        ref.set(groupName)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const changeGroupDescription = (groupId, groupDescription) => {
    const ref = admin.database().ref(`groups/${groupId}/groupDescription`);

    return new Promise((resolve, reject) => {
        ref.set(groupDescription)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const getGroupMember = (groupId) => {
    const ref = admin.database().ref(`groups/${groupId}/members`);

    return new Promise((resolve, reject) => {
        ref.on('value', (snapshot) => {
            ref.off();
            
            const members = snapshot.val();

            if (!members) {
                resolve([]);
            } else {
                resolve(_.keys(members));
            }
        });
    });
};

module.exports = {
    saveGroup,
    insertMember,
    removeMember,
    changeGroupName,
    changeGroupDescription,
    getGroupMember
};
