const pool = require('../../config/dbconfig.js');
module.exports = {
    createUser: (data, callback) => {
        pool.query(
            `insert into registration(firstName,lastName,gender,email,password) values (?,?,?,?,?)`,
            [
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                data.password
            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            }
        )
    },
    getUsers: callback => {
        pool.query(
            `select * from registration`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getUserById: (id, callback) => {
        pool.query(
            `select * from registration where id=?`,
            [id],
            (error, result, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, result);
            }
        )
    },
    updateUser: (data, callback) => {
        pool.query(
            `update registration set firstName=?,lastName=?,gender=?,email=?,password=? where id=?`,
            [
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                data.password,
                data.id
            ],
            (err, result, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, result);
            }
        )
    },
    deleteUser: (data, callback) => {
        pool.query(
            `delete from registration where id=?`,
            [data.id],
            (err, result, fields) => {
                if (err)
                    return callback(err);
                return callback(null, result);
            }
        );
    },
    getUserByEmail: (data, callback) => {
        pool.query(
            `select * from registration where email=?`,
            [data],
            (err, result, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, result[0]);
            }
        );
    }
}