const express = require('express');
const { body } = require('express-validator');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const chatRoutes = require('./routes/message');
const authRoutes = require('./routes/auth');
var cors = require('cors');
const path = require('path')
const multer = require('multer');
const authController = require('./controller/auth');
const User = require('./model/user');
const uuidv4 = require('uuid').v4;
require('dotenv').config();
const app = express();


// @@ ---- TO PREVENT THE "CROSS ORIGIN RESOURCE SHARING" ERROR
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// @@ ---- To serve the public folder statically
// app.use(express.static(path.join(__dirname, 'public', 'build')));
// @@ ---- To serve the images folder statically
app.use('/backend/images', express.static(path.join(__dirname, 'images')));



// @@ ---- identify the destination and name of up comming files
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "backend/images");
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + "-" + file.originalname);
    }
});

// @@ ---- check if file is an image
const fileFilterr = (req, file, cb) => {
    if
        (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/JPG" ||
        file.mimetype === "image/PNG" ||
        file.mimetype === "image/JPEG" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

// @@ ---- limit the file size
const fileSize = 2000000;

// @@ ---- route for handling new sign up route checking file and data validations
app.post('/api/signup',
    multer({
        storage: fileStorage,
        fileFilter: fileFilterr,
        limits: {
            fileSize: fileSize,
        }
    })
        .single('file'),
    [
        body('email')
            .trim()
            .isEmail()
            .withMessage('Enter a valid email')
            .custom(value => {
                return User.findOne({ email: value })
                    .then(user => {
                        if (user) {
                            return Promise.reject('Email Exists')
                        }
                    })
            })
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({ min: 8 })
            .withMessage('Enter 8 or more than 8 charactor password'),
        body('name')
            .trim()
            .exists()
            .withMessage('Name is Requrired'),
        body('lastName')
            .trim()
            .exists()
            .withMessage('Last Name is required'),
    ],
    authController.postSignup, (error, req, res, next) => {
        return res.status(422).send({ message: "Attach file is large than 2mb" });
    }
);


// @@ ---- routes for messages
app.use('/api/chats', chatRoutes);
// @@ ---- routes for users
app.use('/api/users', authRoutes);
// @@ ---- route for serving the react.js build folder
// app.use('/', (req, res, next) => {
//     res.sendFile(path.join(__dirname, 'public', 'build', 'index.html'));
// })

// @@ ---- mongodb connection
mongoose.connect('mongodb://127.0.0.1:27017/chatApp', (error) => {
    if (error) {
        return console.log(error);
    }
})

// @@ ---- starting the backend server
const server = app.listen(8080, () => {
    console.log('server is running on port 8080')
});

// @@ initialization of socket.io 
const io = require('./socket').init(server);

