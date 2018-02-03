module.exports = (res, err) => {
    console.log('ERROR HAPPENED');
    console.log(err);
    res.status(402).send(err);
};
