const MongoLib = require('../../../store/mongo');

class MoviesService{
    constructor(){
        this.collection = 'posts';
        this.mongoDB = new MongoLib();
    }
    async getPosts() {
        const posts = await this.mongoDB.getAll(this.collection);
        console.log(posts);
        return posts || [];
    }

    async getPost({ postId }){
        const post = await this.mongoDB.get( this.collection, postId); 
        return post || {};
    }

    async createPost({ post }){
        const createPostId = await this.mongoDB.create(this.collection, post);
        return createPostId;
    }

    async updatePost({ postId , post } = {} ){
        const updatePostId = await this.mongoDB.update(this.collection,postId, post);
        return updatePostId;
    }

    async deletePost({ postId}){
        const deletePostId = await this.mongoDB.delete(this.collection, postId);
        return deletePostId;
    }
}

module.exports = MoviesService;