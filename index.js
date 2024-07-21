const express = require("express");
const { EnviromentVariables } = require('./config/EnvironmentVariables');
const { DBCONNECTION } = require('./config/dataBase');
const { errorHandler } = require('./middleware/Error/ErrorHandler');
const passport = require('passport');
const session = require('express-session');
require('./auth');

const port = EnviromentVariables.PORT;
const app = express();

DBCONNECTION();

app.use(express.json());

app.use(session({
    secret: "my secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.json({
        message: "You are now connected to the server"
    });
});

app.get('/auth/google', passport.authenticate('google', { scope: [ 'email', 'profile' ] }));
app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failure'
}));

app.get('/auth/google/success', (req, res) => {
    res.json({
        message: "Hello there"
    });
});

app.get('/auth/google/failure', (req, res) => {
    res.redirect('/');
});



app.use(errorHandler);

const server = app.listen(port, () => {
    console.log('Listening to port: ' + port);
});

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use.`);
    } else {
        console.error("Error starting server:", error);
    }
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    console.log("Server is Shutting down due to uncaughtException", error);
    process.exit(1);
});

process.once("unhandledRejection", (reason) => {
    console.log("Server is Shutting down due to unhandledRejection", reason);
    server.close(() => {
        process.exit(1);
    });
});
