const express=require('express')
const route=express.Router()
const services=require('../services/render')
const controller=require('../controller/controller')
/**
 * @description Root Route
 * @method GET
 */

route.get("/",services.homeRoutes)

/**
 * @description add users
 * @method GET
 */


route.get('/add_user',services.add_user)

/**
 * @description update_user
 * @method GET
 */

route.get('/update_user',services.update_user)


// This is for Service side - for user handling data in JSOn with POSTMAN Testing


//Create a User 

route.post('/api/users',controller.createUser)

//Get a User

route.get('/api/users',controller.getUser)

//Update User

route.put('/api/users/:id',controller.updateUser)

//Delete User 

route.delete('/api/users/:id',controller.deleteUser)
module.exports=route