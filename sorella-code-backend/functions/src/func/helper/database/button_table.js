const admin = require('firebase-admin');

const addUserToButton = (userId, buttonId) => {
    const ref = admin.database().ref(`buttons/${buttonId}`);

    return new Promise((resolve, reject) => {
        ref.set({
            userId,
            buttonId
        })
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const getUserIdFromButtonId = (buttonId) => {
    const ref = admin.database().ref(`buttons/${buttonId}`);

    return new Promise((resolve, reject) => {
        ref.on('value', (snapshot) => {
            ref.off();

            const button = snapshot.val();

            if (button && button.userId) {
                resolve(button.userId);
            } else {
                reject('User Not Found');
            }
        });
    });
};

module.exports = {
    addUserToButton,
    getUserIdFromButtonId
};
