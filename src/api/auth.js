const jwt = require('jsonwebtoken');
const { secret } = require('../config/secret');


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        // splitting the header and extracting the token to validate the user
        jwt.verify(token, secret,(err, decoded)=>{
            if (err) {
                res.json({
                    status: 400,
                    success:false,
                    data:err
                });
            }
            else{
                const username = decoded.username;
                console.log("This is token", decoded);
                // checking whether the username found on decoding the token is equal to the username send on the body of the request.
                if (req.body.username === undefined || req.body.username !== username) {
                    res.json({
                        status: 400,
                        data: "Invalid Token"
                    });
                    console.log("Invalid Token")
                }
                else {
                    // if the check is validated we then process the incoming request or else send a token error.
                    next();
                }
            }
          });
    } 
    catch (err) {
        res.json({
            status: 401,
            data: "Token Expired"
        });
        console.log("Token Expired",err)
    }
};