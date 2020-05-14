const { verify } = require('jsonwebtoken');
module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        const key = process.env.KEY;
        if (token) {
            token = token.slice(7);
            verify(token, key, (err, decodedObject) => {
                if (err) {
                    res.json({ success: 0, message: "Invalid token" });
                }
                else { next(); }
            })
        }
        else {
            res.json({ success: 0, message: "Unauthorized user" });
        }
    }
}