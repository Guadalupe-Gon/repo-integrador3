const router = require('express').Router();
const userController = require('../controllers/user.controller');
const {isAuth, isAdmin}  = require('../middlewares/isAuth');


router.get("/users", userController.getUsers)

router.post("/users", userController.createUser)

router.get("/users/:id", userController.getUserById) 

router.delete("/users/:id", userController.deleteUserById)

router.put("/users/:id", [isAuth, isAdmin], userController.updateUserById)

router.post("/login", userController.loginUser)



module.exports = router;