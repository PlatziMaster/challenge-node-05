const express = require('express')
const router = express.Router()
const QuotesService = require('../services/quotes')
const quotesService = new QuotesService()

router.get('/', async (request, response) => {
    try {
        const quotes = await quotesService.getQuotes()

        response.status(200).json({
            data: quotes,
            message: "Quotes listed"
        });
    } catch (err) {
        console.error(err);
    }
})

router.get('/:id', async (request, response) => {
    const id = request.params.id
    try {
        const quote = await quotesService.getQuote(id)

        response.status(200).json({
            data: quote,
            message: "Quote listed"
        });
    } catch (err) {
        console.error(err);
    }
})

router.post('/', async (request, response) => {
    const data = request.body
    try {
        const quoteCreated = await quotesService.createQuote(data)

        response.status(200).json({
            data: quoteCreated,
            message: "Quote created"
        });
    } catch (err) {
        console.error(err);
    }
})

router.put('/:id', async (request, response) => {
    const id = request.params.id
    const updateQuote = request.body
    try {
        const quoteUpdated = await quotesService.updateQuote(id, updateQuote)

        response.status(200).json({
            data: quoteUpdated,
            message: "Quote updated"
        });
    } catch (err) {
        console.error(err);
    }
})

router.delete('/:id', async (request, response) => {
    const id = request.params.id
    try {
        const quoteDeleted = await quotesService.deletedQuote(id)

        response.status(200).json({
            data: quoteDeleted,
            message: "Quote deleted"
        });
    } catch (err) {
        console.error(err);
    }
})

module.exports = router