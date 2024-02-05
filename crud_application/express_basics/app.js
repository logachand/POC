const express = require('express');
const admin=require('./routes/admin')
const shop=require('./routes/shop')
const app = express();
const bodyParser=require('body-parser')
const path =require('path')


app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname,'public')))
app.use('/admin',admin)
app.use('/',shop)


app.use((req,res,next)=>{
        res.status(404).sendFile(path.join(__dirname,'views','404.html'))
})
 app.listen(2000, () => {
    console.log("Server is ON");
});
