const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const salt = 10;
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;


async function getUsers(req, res) {
    try {

        const users = await User.find({})
                                .select({ password: 0, __v: 0 }) 
                                .sort({name: 1})
                                .collation({ locale: "es" });
        res.status(200).send(users);

    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener los usuarios");
    }
}

async function createUser(req, res) {
    try {
        const user = new User(req.body);

        user.role = "user";
        user.password = await bcrypt.hash(user.password, salt);
        
        const newUser = await user.save();
        newUser.password = undefined;

        res.status(201).send({
            message: "Usuario creado correctamente",
            user: newUser
        });

    } catch (error) {
        console.log(error),
            res.status(500).send("Error al crear el usuario")
    }
}

async function getUserById(req, res) {
    try {
        const id = req.params.id;
        const user = await User.findById(id).select({ password: 0, __v: 0 });

        if (!user) {
            return res.status(404).send({
                message: "Usuario no encontrado",
            })
        }

        return res.status(200).send({
            message: "Usuario encontrado",
            user: user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Error al obtener el usuario por ID",
        })
    }
}

async function deleteUserById(req, res) {
    try {
        const id = req.params.id;
        const userDeleted = await User.findByIdAndDelete(id);

        if (!userDeleted) {
            return res.status(404).send({
                message: "No se pudo eliminar el usuario",
            })
        }

        return res.status(200).send({
            message: "Usuario eliminado correctamente",
            user: userDeleted
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error al eliminar el usuario por ID",
        })
    }
}

async function updateUserById(req, res) { 
    try {
        const id = req.params.id;
        const data = req.body;
        
        data.password = undefined;
        data.updatedAt = Date.now();
        
        const userUpdated = await User.findByIdAndUpdate(id, data, { new: true })
        console.log(userUpdated)

        if (!userUpdated) {
            return res.status(404).send({
                message: "No se pudo actualizar el usuario",
            })
        }

        return res.status(200).send({
            message: "Usuario actualizado correctamente",
            user: userUpdated
        })
    
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error al actualizar el usuario por ID",
        })
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).send({
                message: "Email y contraseña requeridos",
            })
        }

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(404).send({
                message: "Credenciales incorrectas",
            })
        }

        const isVerified = await bcrypt.compare(password, user.password);

        if(!isVerified) {
            return res.status(401).send({
                message: "Credenciales incorrectas",
            })
        }

        user.password = undefined;

        const token = jwt.sign(
            user.toJSON(),
            SECRET,
            { expiresIn: "1h" })

        return res.status(200).send({
            message: "Login correcto",
            user,
            token
        })
    
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error al iniciar sesión",
        })
    }
}


module.exports = {
    getUsers,
    createUser,
    getUserById,
    deleteUserById,
    updateUserById,
    loginUser
}
