const MongoLib = require('../lib/mongo');

class QuotesService {
  constructor() {
    this.collection = 'quotes';
    this.mongoDB = new MongoLib();
  }

  async getQuotes() {
    const quotes = await this.mongoDB.getAll(this.collection, null);
    return quotes || [];
  }

  async createQuote({ quote }) {
    const createQuoteId = await this.mongoDB.create(this.collection, quote);
    return createQuoteId;
  }
}

module.exports = QuotesService;
