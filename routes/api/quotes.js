const express = require("express");
const router = express.Router();
const QuotesService = require('../../services/quotes');

const quotesService = new QuotesService();

router.get("/", async function(req, res, next) {
  try {
    // LLAMADA ASINCRONA A services/quotes.getQuotes
    const quotes = await quotesService.getQuotes();
    console.log("req", req.body);
    
    res.status(200).json({
      data: quotes,
      message: "quotes listed"
    });
} catch (err) {
    next(err);
}
});

router.post("/", async function(req, res, next) {
    const { body: quote } = req;
    console.log("req", req.body);
    
    try {
    // LLAMADA ASINCRONA A services/quotes.createdQuotes
    const createdQuotes = await quotesService.createdQuotes({ quote });

    res.status(201).json({
      data: createdQuotes,
      message: "quote created"
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
