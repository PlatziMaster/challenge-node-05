const MongoLib = require('../lib/mongo')

class QuotesService {
    constructor() {
        this.collection = 'quotes'
        this.mongoDb = new MongoLib()
    }

    async getQuotes () {
        const quotes = await this.mongoDb.getAll(this.collection)
        return quotes || []
    }

    async getQuote (id) {
        const quote = await this.mongoDb.get(this.collection, id)
        return quote || []
    }

    async createQuote(quote) {
        const createdId = await this.mongoDb.create(this.collection, quote)
        return createdId
    }

    async updateQuote(id, quote) {
        const updatedId = await this.mongoDb.update(this.collection, id, quote)
        return updatedId
    }

    async deletedQuote(id) {
        const deletedId = await this.mongoDb.delete(this.collection, id)
        return deletedId
    }
}

module.exports = QuotesService