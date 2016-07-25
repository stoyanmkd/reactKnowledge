"use strict";

const path = require('path');
const Hapi = require('hapi');
const Good = require('good');
const Boom = require('boom');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//Connection URL to DB
const url = "mongodb://localhost:27017/comments";

const routes = require('./routes');

//Connect to db
MongoClient.connect(url, {db: {w: 1}}).then((db) => {
    //assert.equal(null, err)
    console.log(`Successfully connected to MongoDB server at ${url}`);

    //Create Hapi server
    const server = new Hapi.Server();
    server.connection({ port: 9000 });

    server.bind({db : db});

    // Register Good plugin
    server.register([{
        register: Good,
        options: {
            reporters: {
                console: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{
                        response: '*',
                        log: '*'
                    }]
                },
                    {
                        module: 'good-console'
                    },
                    'stdout']
            }
        }
    }], (err) => {
        if(err) {
            throw err;
        }

        //Starting the server
        server.start((err) => {
            if(err) {
                throw err
            } else {
                console.log(`server started at: ${server.info.uri}`)
            }
        })
    });

    server.route(routes);
}, (err) => {throw err;});
