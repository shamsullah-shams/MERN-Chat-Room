const User = require('../model/user');
const IO = require('../socket');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// @@ get all users to the frontend
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).send(users);
    } catch (error) {
        return res.status(500).send({ message: "Server Error" });
    }
}


// @@ checks if user is Authorized
exports.isAuth = (req, res, next) => {
    const { token } = req.body;
    if (!token) {
        return res.status(422).send({ message: "Not Authorized", isAuth: false });
    }
    let decodedToken
    try {
        decodedToken = jwt.verify(token, process.env.SECRET);
    } catch (error) {
        return res.status(500).send({ message: "server error try again", isAuth: false });
    }
    if (!decodedToken) {
        return res.status(422).send({ message: 'Not Authorized', isAuth: false });
    }
    return res.status(200).send({ message: "user is authorized", isAuth: true });
}




// @@ gets all user data stores it into the database
exports.postSignup = async (req, res, next) => {
    const validationError = validationResult(req);
    let error = '';
    if (!validationError.isEmpty()) {
        let counter = 0;
        validationError.array().filter(vE => {
            counter++;
            error += counter + ":- " + vE.msg + "  "
        })
        return res.status(422).send({ message: error });
    }
    console.log(req.file);
    if (!req.file) {
        return res.status(422).send({ message: "Attach file is not image Or file must be less than 3mb" })
    }
    const { name, lastName, email, password } = req.body;
    console.log('req');
    try {
        const hashpassword = bcrypt.hashSync(password, 12);
        const imageUrl = req.file.path;
        const user = new User(
            {
                name: name,
                lastName: lastName,
                email: email,
                password: hashpassword,
            }
        );
        await user.save();
        // IO.getIO().emit('newuser', { action: "newuser", newuser: user })
        res.status(201).json({ message: "user is added" });

    } catch (error) {
        return res.status(500).send({ error });
    }

}


exports.postSignin = async (req, res, next) => {
    const validationError = validationResult(req);
    let error = '';
    if (!validationError.isEmpty()) {
        let counter = 0;
        validationError.array().filter(vE => {
            counter++;
            error += counter + ":- " + vE.msg + "  "
        })
        return res.status(422).send({ message: error });
    }
    const { email, password } = req.body;


    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(422).send({ message: "User Not Found" });
        }
        const doMatch = bcrypt.compareSync(password, user.password);
        if (doMatch) {
            const token = jwt.sign({
                email: email,
            }, process.env.SECRET, { expiresIn: '3h' });
            return res.status(200).json({ user: user, token: token });
        }
        return res.status(422).send({ message: "User Name or password is wrong" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Server Error" });
    }
}