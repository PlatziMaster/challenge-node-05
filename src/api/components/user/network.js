const express = require('express');
const response = require('../../../network/response');
const controller = require('./controller');

const router = express.Router();
const userService = new controller();
//Routes
router.get('/', list);
router.get('/:id', get);
router.post('/', post);

async function list(req, res, next){
    try{
        const users = await userService.getUsers();
        response.success(req, res, users, 200);
    }catch(error){
        next(error)
    }
    
};

async function get(req,res, next){
    try{
        const { userId } = req.params.id;
        const user = await userService.getUser(userId);
        response.success(req, res, user, 200);
    }catch(error){
        next(error)
    }
}

async function post(req, res, next){
    const { body: user } = req; 
    try {
        const createdUserId = await userService.createUser({user})
        res.status(201).json({
            data: createdUserId,
            message: 'User Created'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = router;
