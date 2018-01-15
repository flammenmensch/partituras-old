const express = require('express');
const router = express.Router();
const dbService = require('../services/dbService');

const formatApiResponse = (res) => (data) =>
  res.json({
    error: false,
    data
  });

const formatErrorResponse = (res) => (err, status=500) =>
  res.status(status).json({
    error: true,
    details: err
  });

router.get('/random', (req, res, next) =>
  dbService.getRandomPartituras(req.params.limit)
    .then(formatApiResponse(res))
    .catch(formatErrorResponse(res))
);

router.get('/search', (req, res, next) => {
  dbService.searchPartituras(req.query.q)
    .then(formatApiResponse(res))
    .catch(formatErrorResponse(res));
});

router.get('/:id', (req, res, next) =>
  dbService.getPartituraById(req.params.id)
    .then(formatApiResponse(res))
    .catch(formatErrorResponse(res))
);

router.get('/:id/print', (req, res, next) =>
  dbService.getPartituraById(req.params.id)
    .then((item) => {
      // TODO: Prepare item for print here
      formatApiResponse(res)(item);
    })
    .catch(formatErrorResponse(res))
);

router.use((req, res, next) =>
  formatErrorResponse(res)('Endpoint not found', 404)
);

module.exports = router;
