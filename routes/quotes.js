const express = require('express');
const QuotesService = require('../services/quotes');

function quotesApi(app) {
  const router = express.Router();
  app.use('/', router);

  router.get('/', async function (req, res, next) {
    res.status(200).json({
      message: '¡Hola Mundo Cruel!'
    });
  });

  const quotesService = new QuotesService();

  router.get('/quotes', async function (req, res, next) {
    try {
      const quotes = await quotesService.getQuotes();

      res.status(200).json({
        data: quotes,
        message: 'quotes listed'
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/addquote', async function (
    req,
    res,
    next
  ) {
    const { body: quote } = req;
    try {
      const createdQuoteId = await quotesService.createQuote({ quote });

      res.status(201).json({
        data: createdQuoteId,
        message: 'quote created'
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = quotesApi;
