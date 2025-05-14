const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;


function isAuth(req, res, next) {

    const token = req.headers.access_token;

    if (!token) {
        return res.status(401).send({
            message: "No se ha proporcionado un token de acceso",
        });
    }

    jwt.verify(token, SECRET, (error, decoded) => {
        if (error) {
            return res.status(401).send({
                message: "Token inválido",
            });
        }

        req.user = decoded;
        next();
    });
}

function isAdmin(req, res, next) {
    
    const token = req.headers.access_token;

    if (!token) {
        return res.status(401).send({
            message: "No se ha proporcionado un token de acceso",
        });
    }

    jwt.verify(token, SECRET, (error, decoded) => {
        if (error) {
            return res.status(401).send({
                message: "Token inválido",
            });
        }

        if (decoded.role !== "admin") {
            return res.status(403).send({
                message: "No tienes permisos para acceder a este recurso",
            });
        }

        req.user = decoded;
        next();
    });
}


module.exports = {isAuth, isAdmin};
