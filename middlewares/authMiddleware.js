const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        //get token Bearer jhfkudjfhjkds
        const token = req.headers['authorization'].split(" ")[1];
        // verify a token symmetric - synchronous
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(401).send({
                    success: false,
                    message: "Unauthorize User"
                });
            } else {
                req.body.id = decode.id;
                next();
            }
        });

    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Please provide Auth token",
            error
        });

        console.log(error);
    }
}