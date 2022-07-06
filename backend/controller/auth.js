const User = require('../model/user');
const IO = require('../socket');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


// @@ --- returns all users to the frontend
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).send(users);
    } catch (error) {
        return res.status(500).send({ message: "Server Error" });
    }
}


// @@ ---- checks if user is Authorized
exports.isAuth = (req, res, next) => {
    const { token } = req.body;
    if (!token) {
        return res.status(422).send({ message: "Not Authorized", isAuth: false });
    }
    let decodedToken
    // @@ ---- checking jsonwebtoken 
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




// @@ ---- gets all user data stores it into the database
exports.postSignup = async (req, res, next) => {
    // @@ ---- checking validatin errors
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
    // @@ ---- checking user image
    if (!req.file) {
        return res.status(422).send({ message: "Attach file is not image Or file must be less than 3mb" })
    }
    const { name, lastName, email, password } = req.body;
    try {
        // @@ ---- creating hash password for users
        const hashpassword = bcrypt.hashSync(password, 12);
        const imageUrl = req.file.path;
        const user = new User(
            {
                name: name,
                lastName: lastName,
                email: email,
                password: hashpassword,
                imageUrl: imageUrl,
            }
        );
        await user.save();
        // @@ ---- informing all connected clients about new sign up
        IO.getIO().emit('newuser', { action: "newuser", newuser: user })
        res.status(201).json({ message: "user is added" });

    } catch (error) {
        return res.status(500).send({ error });
    }

}


// @@ ---- function for signing a client 
exports.postSignin = async (req, res, next) => {
    // @@ ---- checking validation errors
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
        // @@ ---- check if user exists on the email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(422).send({ message: "User Not Found" });
        }
        // @@ ---- compare passwords
        const doMatch = bcrypt.compareSync(password, user.password);
        if (doMatch) {
            const token = jwt.sign({
                email: email,
            }, process.env.SECRET, { expiresIn: '3h' });
            return res.status(200).json({ user: user, token: token });
        }
        return res.status(422).send({ message: "User Name or password is wrong" });
    } catch (error) {
        return res.status(500).send({ message: "Server Error" });
    }
}