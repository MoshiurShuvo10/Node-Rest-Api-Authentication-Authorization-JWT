const { createUser, getUserById, updateUser, deleteUser, getUsers, getUserByEmail } = require('./user.service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        //hash the password before saving into database
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        createUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "User created successfully",
                data: results
            });
        })
    },
    getUserById: (req, res) => {
        const user_id = req.params.id;
        console.log("user_id: " + user_id);
        getUserById(user_id, (err, result) => {
            if (err) {
                console.log("There was an error.");
                return;
            }
            if (!result) {
                console.log("no user found");
                return res.json({
                    success: 0,
                    message: "No user found"
                });
            }
            return res.json({
                success: 1,
                data: result
            });
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log("There was an error");
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "resource empty"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateUser: (req, res) => {
        const body = req.body;
        //hash the password before saving into database
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.json({
                success: 1,
                message: "User updated successfully",
                body: results
            });
        })
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, result) => {
            if (err) {
                console.log('error occured');
                return;
            }
            if (!result) {
                return res.json({
                    success: 0,
                    message: "No record found"
                });
            }
            return res.json({
                success: 1,
                message: "User deleted successfully"
            });
        })
    },
    loginUser: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, result) => {
            if (err) {
                console.log("error in login");
                return;
            }
            if (!result) {
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                });
            }
            const comparisonResult = compareSync(body.password, result.password);
            if (comparisonResult) {
                comparisonResult.password = undefined;
                const jsontoken = sign({ comparisonResult: result }, "public_key", { expiresIn: "1h" });
                res.json({ success: 1, message: "login successfull", token: jsontoken });
            }
            else {
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                });
            }
        });
    }
}