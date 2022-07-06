const express = require('express');
const { body } = require('express-validator');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const messageRoutes = require('./routes/message');
const authRoutes = require('./routes/auth');
var cors = require('cors');
const path = require('path')
const multer = require('multer');
const authController = require('./controller/auth');
const User = require('./model/user');
const uuidv4 = require('uuid').v4;
require('dotenv').config();
const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "backend/images");
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + "-" + file.originalname);
    }
});

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


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public', 'build')));
app.use('/images', express.static(path.join(__dirname, 'images')));


const fileSize = 2000000;
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

app.use(messageRoutes);
app.use(authRoutes);



mongoose.connect('mongodb://127.0.0.1:27017/chatApp', (error) => {
    if (error) {
        return console.log(error);
    }
})

const server = app.listen(8080, () => {
    console.log('server is running on port 8080')
});

const io = require('./socket').init(server);


io.on('connection', socket => {
})

