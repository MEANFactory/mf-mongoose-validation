module.exports = {
    db: {
        uri: 'mongodb://mongo:27017/devdb',
        options: {
            // db: { native_parser: true },
            // // server: { poolSize: 5 },
            // replset: { rs_name: 'myReplicaSetName' },
            user: 'dbusername',
            pass: 'password'
        }
    }
};
