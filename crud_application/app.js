const express=require('express')
const dotenv=require('dotenv')
const morgan=require('morgan')
const bodyparser=require('body-parser')
const path=require('path')
const app=express();
dotenv.config({ path:'.env' })
const route=require('./server/routes/router')
const connectDB=require('./server/database/connection')

const PORT = process.env.PORT || 8000;
// log request

app.use(morgan('tiny'))

// connect MongoDB

connectDB()

app.use(express.json());
// Parse the request to Body parser
app.use(bodyparser.urlencoded({extended:true}))

//set view engine
app.set('view engine','ejs')
// app.set('views',path.resolve(__dirname,""))

//load assets

app.use('/css', express.static(path.join(__dirname, "assets/css")));
app.use('/img', express.static(path.join(__dirname, "assets/img")));
app.use('/js', express.static(path.join(__dirname, "assets/js")));


//load routers
app.use('/',route)


app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})





