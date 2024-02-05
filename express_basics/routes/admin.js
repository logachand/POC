const express=require('express')
const app=express()
const rootDir=require('../utils/path')
const router=express.Router();
const path=require('path')

router.get('/', (req, res, next) => { 
   res.sendFile(path.join(rootDir,'views','add-prod.html'))
});

module.exports=router;