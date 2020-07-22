const express = require('express');

const response = require('../../../network/response');
const Controller = require('./controller');

const router = express.Router();
const postService = new Controller();
// Routes
router.get('/', list);
router.get('/:id', getPost);

// functions
async function list(req, res, next) {
    try{
        const posts = await postService.getPosts();
        response.success(req, res, posts, 200);
    }catch(error){
        next(error)
    }
}

async function getPost(req, res, next) {
    try{
        const { postId } = req.params.id;
        const post = await postService.getPosts({postId});
        response.success(req, res, posts, 200);
    }catch(error){
        next(error)
    }
}


module.exports = router;