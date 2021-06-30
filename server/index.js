const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const port = 8080;
module.exports = app;

const createApp = () => {
    // logging middleware
    app.use(morgan('dev'));

    // body parsing middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });

    // api routes
    app.use("/api", require("./api"));

    // static file-serving middleware
    app.use(express.static(path.join(__dirname, '..', 'public')));

    // Sends the index.html (the "single page" of the SPA)
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '..', 'public/index.html'));
    });

    // error handling endware  
    app.use(function (err, req, res, next) {
        console.error(err);
        console.error(err.stack);
        res.status(err.status || 500).send(err.message || 'Internal server error.');
    });
};

const startListening = () => {
    // starts listening (and creates a 'server' object representing the server)
    const server = app.listen(port, () => 
    console.log(`Listening on port ${port}!`)
    );
};    


async function bootApp() {
    await createApp();
    await startListening();
};

bootApp();
