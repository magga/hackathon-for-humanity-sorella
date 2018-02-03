const admin = require('firebase-admin');
const _ = require('lodash');

const saveUserProfile = (user) => {
    const ref = admin.database().ref(`users/${user.userId}`);

    return new Promise((resolve, reject) => {
        ref.child('line/profile').set(user)
            .then(() => {
                setFriendWithBotSetting(user.userId, true)
                    .then(() => {
                        resolve();
                    })
                    .catch((err) => {
                        reject(err);
                    });
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const setFriendWithBotSetting = (userId, isFriend) => {
    const ref = admin.database().ref(`users/${userId}/setting/friendWithBot`);

    return new Promise((resolve, reject) => {
        ref.set(isFriend)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const insertGroup = (groupId, userId) => {
    const ref = admin.database().ref(`users/${userId}/data/groups/${groupId}`);

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

const removeGroup = (groupId, userId) => {
    const ref = admin.database().ref(`users/${userId}/data/groups/${groupId}`);

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

const getUserProfileFromDatabase = (userId) => {
    const ref = admin.database().ref(`users/${userId}`);

    return new Promise((resolve, reject) => {
        ref.on('value', (snapshot) => {
            ref.off();
            
            const user = snapshot.val();

            resolve(user);
        });
    });
};

getUserNamesFromList = (ids) => {
    let finished = false;
    let listUserName = [];

    return new Promise((resolve, reject) => {
        ids.map((id, index) => {
            const ref = admin.database().ref(`users/${id}`);

            ref.on('value', (snapshot) => {
                ref.off();
                
                const user = snapshot.val();

                listUserName.push(user.line.profile.displayName);

                if (index == ids.length - 1) {
                    finished = true;
                }

                if (finished) {
                    resolve(listUserName);
                }
            });
        });
    });
};

const insertJobsJob = (userId, job) => {
    const ref = admin.database().ref(`users/${userId}/data/jobs/job`);

    return new Promise((resolve, reject) => {
        ref.set(job)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const insertJobsTimeHome = (userId, timeHome) => {
    const ref = admin.database().ref(`users/${userId}/data/jobs/timeHome`);

    return new Promise((resolve, reject) => {
        ref.set(timeHome)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const getAllUserId = () => {
    const ref = admin.database().ref(`users`);

    return new Promise((resolve, reject) => {
        ref.on('value', (snapshot) => {
            ref.off();
            
            const users = snapshot.val();

            resolve(_.keys(users));
        });
    });
};

const insertButtonId = (userId, buttonId) => {
    const ref = admin.database().ref(`users/${userId}/data/button/buttonId`);

    return new Promise((resolve, reject) => {
        ref.set(buttonId)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const insertButtonPressed = (userId, data) => {
    const ref = admin.database().ref(`users/${userId}/data/button/pressed/${data.timestamp}`);

    return new Promise((resolve, reject) => {
        ref.set(data)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
};

module.exports = {
    saveUserProfile,
    setFriendWithBotSetting,
    insertGroup,
    removeGroup,
    getUserProfileFromDatabase,
    getUserNamesFromList,
    insertJobsJob,
    insertJobsTimeHome,
    getAllUserId,
    insertButtonId,
    insertButtonPressed
};
