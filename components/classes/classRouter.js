const express = require('express');
const router = express.Router();
const classController = require('./classController');

router.get('/', (req, res, next) => {
  classController.classGet(req, res, next);
});

router.post('/', (req, res, next) => {
  classController.CreateNewPost(req, res, next);
});

router.get('/:id', (req, res, next) => {
  classController.classGetbyID(req, res, next);
});

module.exports = router;
