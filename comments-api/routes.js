"use strict";
const handlers = require('./handlers');

module.exports = [
    {
        method: 'GET',
        path: '/api/comments',
        handler: handlers.findAll
    },
    {
        method: 'POST',
        path: '/api/comments',
        handler: handlers.create
    },
    {
        method: 'DELETE',
        path: '/api/comments/{commentId}',
        handler: handlers.remove
    }
];