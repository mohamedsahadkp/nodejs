const router = require('express').Router();
const { list, userDetails } = require('./users.service');

const routes = () => {

  
  router.route('/:id')
    .get(userDetails);

  router.route('/')
    .get(list);

    return router;
};

module.exports = { routes, path: 'users' };
